import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      // https://stackoverflow.com/a/57137251
      url: `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
    },
  });

  const options = new DocumentBuilder()
    .setTitle('Hydration System API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
