import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('WhatsApp API Client')
    .setDescription('API for managing WhatsApp conversations and messages')
    .setVersion('1.0')
    .addTag('wa-conversations', 'WhatsApp Conversations management')
    .addTag('wa-messages', 'WhatsApp Messages management and retrieval')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
