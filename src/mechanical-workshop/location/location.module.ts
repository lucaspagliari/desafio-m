import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MechanicalWorkshop,
  MechanicalWorkshopSchema,
} from '../schemas/mechanical-workshop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MechanicalWorkshop.name, schema: MechanicalWorkshopSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
