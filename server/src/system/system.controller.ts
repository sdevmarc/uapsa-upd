import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SystemService } from './system.service';
import { ISystemHeader } from './system.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('system')
export class SystemController {
    constructor(
        private readonly systemService: SystemService
    ) { }

    @Post('update-header')
    @UseInterceptors(FileInterceptor('file'))  // 'file' is the key for file upload
    async UpdateSystemUIHeader(
        @Body() body: ISystemHeader,             // Extract the other fields from the bod
        @UploadedFile() file: Express.Multer.File // Extract the uploaded file
    ) {
        const { public_id, headerTitle } = body; // Destructure the body
        const headerIconFile = file;             // The uploaded file

        // const decodedPublicId = decodeURIComponent(public_id)
        const response = await this.systemService.findOneSystemUIHeader({ public_id });
        if (!response.success) return await this.systemService.InsertSystemUIHeader({ headerTitle, headerIconFile })
        return response
    }
}
