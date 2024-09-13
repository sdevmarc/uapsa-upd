import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemController } from './system.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SystemHeaderUISchema, SystemSignInUISchema } from './system.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'SystemHeaderUI', schema: SystemHeaderUISchema },
    { name: 'SystemSignInUI', schema: SystemSignInUISchema },
  ])],
  providers: [SystemService, CloudinaryService],
  controllers: [SystemController]
})
export class SystemModule { }
