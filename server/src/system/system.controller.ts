import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SystemService } from './system.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('system')
export class SystemController {
    constructor(
        private readonly systemService: SystemService
    ) { }

    // @Post('update-settings')
    // @UseInterceptors(FileInterceptor('file'))  // 'file' is the key for file upload
    // async UpdateSystemSettings(
    //     @Body() body: ISystemUI,             // Extract the other fields from the bod
    //     @UploadedFile() file: Express.Multer.File // Extract the uploaded file
    // ) {
    //     const { public_id, headerTitle } = body; // Destructure the body
    //     const headerIconFile = file;             // The uploaded file

    //     // const decodedPublicId = decodeURIComponent(public_id)
    //     const response = await this.systemService.findOneSystemUIHeader({ public_id });
    //     if (!response.success) return await this.systemService.InsertSystemUIHeader({ headerTitle, headerIconFile })
    //     return response
    // }

    @Post('update-title')
    async updateHeaderTitle(@Body() { header_title }: { header_title: string }) {
        return this.systemService.updateHeaderTitle({ header_title })
    }

    @Post('update-header')
    @UseInterceptors(FileInterceptor('file'))
    async updateHeaderIcon(@UploadedFile() file: Express.Multer.File) {
        const header_icon_file = file;
        return this.systemService.updateHeaderIcon({ header_icon_file })
    }

    @Post('update-signin-bg')
    @UseInterceptors(FileInterceptor('file'))
    async updateSignBG(@UploadedFile() file: Express.Multer.File) {
        const bg_image_file = file;
        return this.systemService.updateSignInBG({ bg_image_file })
    }
}
