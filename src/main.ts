import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Devspace')
    .setDescription('NestJs API')
    .setVersion('0.1')
    .build();


  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors();
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
