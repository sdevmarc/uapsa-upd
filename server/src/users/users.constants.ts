import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  secret: new ConfigService().get<string>('SECRET_JWT_TOKEN'),
};