import { ApiProperty } from '@nestjs/swagger';

export class CreateMechanicalWorkshopDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty({
    type: Object
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}
