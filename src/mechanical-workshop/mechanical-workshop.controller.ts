import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MechanicalWorkshopService } from './mechanical-workshop.service';
import { CreateMechanicalWorkshopDto } from './dto/create-mechanical-workshop.dto';
import { UpdateMechanicalWorkshopDto } from './dto/update-mechanical-workshop.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('mechanical-workshop')
export class MechanicalWorkshopController {
  constructor(
    private readonly mechanicalWorkshopService: MechanicalWorkshopService,
  ) {}

  @Post()
  create(@Body() createMechanicalWorkshopDto: CreateMechanicalWorkshopDto) {
    return this.mechanicalWorkshopService.create(createMechanicalWorkshopDto);
  }

  @Get()
  findAll() {
    return this.mechanicalWorkshopService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.mechanicalWorkshopService.findOne(id);
    
    if (!data) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    
    return data
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMechanicalWorkshopDto: UpdateMechanicalWorkshopDto,
  ) {
    return this.mechanicalWorkshopService.update(
      id,
      updateMechanicalWorkshopDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mechanicalWorkshopService.remove(id);
  }
}
