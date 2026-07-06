
import { Injectable } from '@nestjs/common';
import { TrucksService } from 'src/trucks/trucks.service';import { Truck } from 'src/trucks/entities/truck.entity';import { initialData, SeedGmc } from './data/seed-data';



@Injectable()
export class SeedService {
 
    constructor(
        private readonly truckService: TrucksService,

    ){}

    async runSeed() {
        await this.insertTrucks();

        return 'SEED EXECUTED';
    }


    private async insertTrucks() {
        await this.truckService.deleteAllTrucks();

        const trucks = initialData.trucks;

        const insertPromises: Promise<Truck>[] = [];

        trucks.forEach( truck => {
            insertPromises.push( this.truckService.create(truck) );
        } );

        await Promise.all(insertPromises);

        return true;
    }
}
