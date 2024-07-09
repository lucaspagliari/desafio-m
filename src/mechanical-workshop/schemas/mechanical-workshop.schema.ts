import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MechanicalWorkshopDocument = HydratedDocument<MechanicalWorkshop>;

@Schema()
export class MechanicalWorkshop {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: {
      type: String,
      default: 'Point',
      select: false
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
  })
  location: {
    type: string;
    coordinates: [number];
  };

  @Prop({ select: false })
  __v: string
}

export const MechanicalWorkshopSchema =
  SchemaFactory.createForClass(MechanicalWorkshop);

MechanicalWorkshopSchema.index({ location: '2dsphere'})
