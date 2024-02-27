import { serve, setup } from 'swagger-ui-express';
import * as YAML from 'yamljs';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const base_path = 'api/v1/consonance';
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(base_path);

  const swaggerDocument = YAML.load('./src/swagger.yaml');
  app.use(`/${base_path}/docs`, serve, setup(swaggerDocument));
  // console.log()

  // await app.listen(3000);
  await app.listen(process.env.CONSONANCE_PORT);
  // await app.listen(3000);
}
bootstrap();
