import { Module } from '@nestjs/common';
import { MechanicalWorkshopService } from './mechanical-workshop.service';
import { MechanicalWorkshopController } from './mechanical-workshop.controller';
import { LocationModule } from './location/location.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MechanicalWorkshop,
  MechanicalWorkshopSchema,
} from './schemas/mechanical-workshop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MechanicalWorkshop.name, schema: MechanicalWorkshopSchema },
    ]),
    LocationModule,
  ],

  controllers: [MechanicalWorkshopController],
  providers: [MechanicalWorkshopService],
})
export class MechanicalWorkshopModule {}
