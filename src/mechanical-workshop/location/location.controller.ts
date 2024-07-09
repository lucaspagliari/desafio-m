import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get()
  findAll(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ) {
    return this.locationService.findAll(latitude, longitude, radius);
  }
}
