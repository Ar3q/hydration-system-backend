import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('envs', process.env.MQTT_HOST, process.env.MQTT_PORT);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      // https://stackoverflow.com/a/57137251
      url: `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
