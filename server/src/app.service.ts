import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async getHello()
        : Promise<{ success: boolean, message: string }> {
        return { success: true, message: 'You are authenticated.' }
    }
}
