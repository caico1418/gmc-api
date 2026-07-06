import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TrucksModule } from 'src/trucks/trucks.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TrucksModule,
  ]
})
export class SeedModule {}
