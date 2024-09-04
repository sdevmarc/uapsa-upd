import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext,)
        : Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();
        try {

            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET_JWT_TOKEN
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException()
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) throw new HttpException({ success: false, message: 'You are not authorized.' }, HttpStatus.BAD_REQUEST)

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_JWT_TOKEN });
            if (!payload) throw new HttpException({ success: false, message: 'You are not authorized.' }, HttpStatus.BAD_REQUEST)
            const role = this.jwtService.decode(token).role;
            if (!role) return false

            request['role'] = role;
            return true;
        } catch (error) {
            throw new HttpException({ success: false, message: 'You are not authorized.' }, HttpStatus.BAD_REQUEST);
        }
    }
}