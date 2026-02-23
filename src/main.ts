import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser'; // meka samahara welawata wada karanne na

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const clientUrl =
    configService.get<string>('CLIENT_URL') || 'http://localhost:3000';

  // 🔹 Swagger
  const config = new DocumentBuilder()
    .setTitle('Electronic ERP API')
    .setDescription('Backend API for Electronic Shop ERP')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter access token',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 🔹 Global prefix
  app.setGlobalPrefix('api/v1');

  // 🔹 Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🔹 CORS
  app.enableCors({
    origin: clientUrl,
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(port);

  console.log(`🚀 Server running on port: ${port}`);
  console.log(`📘 Swagger UI: http://localhost:${port}/api/docs`);
}

bootstrap();
