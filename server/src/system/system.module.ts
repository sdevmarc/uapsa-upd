import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemUISchema } from './system.schema';
import { SystemController } from './system.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'SystemUi', schema: SystemUISchema },
  ])],
  providers: [SystemService, CloudinaryService],
  controllers: [SystemController]
})
export class SystemModule { }
