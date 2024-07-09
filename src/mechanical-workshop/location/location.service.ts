import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MechanicalWorkshop } from '../schemas/mechanical-workshop.schema';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(MechanicalWorkshop.name)
    private mechanicalWorkshopModel: Model<MechanicalWorkshop>,
  ) {}

  async findAll(latitude: number, longitude: number, radius: number) {
    return this.mechanicalWorkshopModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $minDistance: 0,
          // radius in meters
          $maxDistance: radius,
        },
      },
    });
  }
}
