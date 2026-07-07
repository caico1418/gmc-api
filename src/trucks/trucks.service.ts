import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Truck } from './entities/truck.entity';
import { ILike, Repository } from 'typeorm';

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

  async findOne(term: string) {

    term.trim();

    const truck = await this.truckRepository.find({
      where: {
        model: ILike(`%${term}%`)
      }
    });

    return truck;
  }

  async update(id: string, updateTruckDto: UpdateTruckDto) {
    try {
      const truck = await this.truckRepository.preload({
        id: id,
        ...updateTruckDto
      })

      if(!truck) {
        throw new NotFoundException('No existe');
      }

      await this.truckRepository.save(truck);

      return truck;

    } catch (error) {
      console.log(error)
    }
  }

  async remove(id: string) {
     await this.truckRepository.delete(id);
    return {
      message: 'deleted'
    };
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
