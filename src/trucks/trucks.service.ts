import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Truck } from './entities/truck.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrucksService {


  constructor(
    @InjectRepository(Truck)
    private readonly truckRepository: Repository<Truck>,
  ){}

  async create(createTruckDto: CreateTruckDto): Promise<Truck> {
    try {
      const truck = await this.truckRepository.create(createTruckDto);

      await this.truckRepository.save(truck);

      return truck;

    } catch (error) {
      this.handleExceptionDB(error);
      throw error;
    }
  }

  async findAll() {
    return await this.truckRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} truck`;
  }

  update(id: number, updateTruckDto: UpdateTruckDto) {
    return `This action updates a #${id} truck`;
  }

  remove(id: number) {
    return `This action removes a #${id} truck`;
  }


  async deleteAllTrucks() {
    const query = this.truckRepository.createQueryBuilder('truck');

    try {
      return await query
      .delete()
      .where({})
      .execute()
    } catch (error) {
      
    }
  }

  private handleExceptionDB(error: any) {
    if(error.code === "23505") {
      throw new BadRequestException('Ya existe el resgistro')
    }
  }
}
