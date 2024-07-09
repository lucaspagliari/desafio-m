import { Injectable } from '@nestjs/common';
import { CreateMechanicalWorkshopDto } from './dto/create-mechanical-workshop.dto';
import { UpdateMechanicalWorkshopDto } from './dto/update-mechanical-workshop.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MechanicalWorkshop } from './schemas/mechanical-workshop.schema';

@Injectable()
export class MechanicalWorkshopService {
  constructor(
    @InjectModel(MechanicalWorkshop.name) private mechanicalWorkshopModel: Model<MechanicalWorkshop>
  ) {
  }

  async create(createMechanicalWorkshopDto: CreateMechanicalWorkshopDto) {
    const workshop = new this.mechanicalWorkshopModel(createMechanicalWorkshopDto);
    return workshop.save()
  }

  findAll() {
    return this.mechanicalWorkshopModel.find().exec();
  }

  findOne(id: string) {
    return this.mechanicalWorkshopModel.findById(id).exec();
  }

  update(id: string, updateMechanicalWorkshopDto: UpdateMechanicalWorkshopDto) {
    updateMechanicalWorkshopDto.location.type = "Point"
    return this.mechanicalWorkshopModel.findByIdAndUpdate(id, updateMechanicalWorkshopDto)
  }

  async remove(id: string) {
    await this.mechanicalWorkshopModel.deleteOne({ _id: id })
  }

}
