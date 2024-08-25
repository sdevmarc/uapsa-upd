import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PointsSchema } from './points.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Point', schema: PointsSchema }])],
  providers: [PointsService],
  controllers: [PointsController]
})
export class PointsModule { }
