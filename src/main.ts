import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
import { CommonExceptionDto } from './common/entities/common-exception.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  const config = new DocumentBuilder()
    .addGlobalResponse({
      type: CommonExceptionDto,
      description: 'Global error response',
      status: 400,
    })
    .addServer('http://localhost:3000', 'Local server')
    .addServer('https://api.example.com', 'Production server')
    .addBearerAuth()
    .setTitle('Project example')
    .setDescription('The project API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { showCommonExtensions: true },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err));
