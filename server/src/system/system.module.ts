import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemController } from './system.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SystemUISchema } from './system.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'SystemUI', schema: SystemUISchema },
  ])],
  providers: [SystemService, CloudinaryService],
  controllers: [SystemController]
})
export class SystemModule { }
