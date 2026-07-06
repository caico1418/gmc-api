import { Module } from '@nestjs/common';
import { TrucksModule } from './trucks/trucks.module';

@Module({
  imports: [TrucksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
