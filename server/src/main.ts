import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard(app.get(JwtService)));
  app.enableCors();
  await app.listen(process.env.PORT || 3003);
}

bootstrap()
