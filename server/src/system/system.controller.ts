import { Body, Controller, Get, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { SystemService } from './system.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ISystemUI } from './system.interface';

@Controller('system')
export class SystemController {
    constructor(
        private readonly systemService: SystemService
    ) { }

    @Get()
    async findSystemUi() {
        return this.systemService.getSystemUi()
    }

    // @UseGuards(AuthGuard)
    @Post('update-ui')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'icon', maxCount: 1 },
        { name: 'background', maxCount: 1 },
    ]))
    async updateHeaderIcon(
        @Body() { header_title }: ISystemUI,
        @UploadedFiles() files: { icon?: Express.Multer.File[], background?: Express.Multer.File[] }
    ) {

        console.log('Received header title:', header_title);
        const header_icon_file = files.icon?.[0];
        const bg_image_file = files.background?.[0];

        console.log('Received files:', header_icon_file, bg_image_file);

        return this.systemService.updateUI({ header_title, header_icon_file, bg_image_file })
    }
}
