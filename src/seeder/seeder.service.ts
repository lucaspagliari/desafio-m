import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MechanicalWorkshop } from 'src/mechanical-workshop/schemas/mechanical-workshop.schema';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectModel(MechanicalWorkshop.name)
    private mechanicalWorkshopModel: Model<MechanicalWorkshop>,
  ) {}

  async clear() {
    await this.mechanicalWorkshopModel.deleteMany({})
  }

  async seed() {
    const data = [
      {
        name: 'Polotto Automóveis',
        address: 'Avenida Martins',
        location: { type: 'Point', coordinates: [-46.8698724, -23.205374] },
      },
      {
        name: 'Arara Carros',
        address: 'Avenida Martins',
        location: { type: 'Point', coordinates: [-46.8663316, -23.2081681] },
      },
      {
        name: 'Movida Carros',
        address: 'Avenida Jundiai',
        location: { type: 'Point', coordinates: [-46.8744554, -23.2153038] },
      },
      {
        name: 'Destro Mecanica',
        address: 'Avenida Industrial',
        location: { type: 'Point', coordinates: [-46.9383406, -23.1431624] },
      },
    ];

    for (const item of data) {
      const exists = await this.mechanicalWorkshopModel.findOne({
        name: item.name,
      });
      if (!exists) {
        await new this.mechanicalWorkshopModel(item).save();
      }
    }
  }

  async onModuleInit() {
    // await this.clear()
    await this.seed();
  }
}
