import { Module } from '@nestjs/common';
import { MechanicalWorkshopModule } from './mechanical-workshop/mechanical-workshop.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST || 'localhost'}:27017/app_db`,
    ),
    MechanicalWorkshopModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
