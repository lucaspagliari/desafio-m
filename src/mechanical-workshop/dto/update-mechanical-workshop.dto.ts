import { PartialType } from '@nestjs/swagger';
import { CreateMechanicalWorkshopDto } from './create-mechanical-workshop.dto';

export class UpdateMechanicalWorkshopDto extends PartialType(CreateMechanicalWorkshopDto) {}
