import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MechanicalWorkshop, MechanicalWorkshopSchema } from '../mechanical-workshop/schemas/mechanical-workshop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MechanicalWorkshop.name, schema: MechanicalWorkshopSchema }]),

  ],
  providers: [SeederService]
})
export class SeederModule {}
