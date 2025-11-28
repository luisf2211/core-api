import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions =
    fs.existsSync('cert/key.pem') && fs.existsSync('cert/cert.pem')
      ? {
          key: fs.readFileSync(path.join(__dirname, '..', 'cert/key.pem')),
          cert: fs.readFileSync(path.join(__dirname, '..', 'cert/cert.pem')),
        }
      : undefined;

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Core.API.Backend')
    .setDescription('Este microservicio es el core de la aplicación')
    .setContact('Luis Felipe Reyes Baez', '', 'reyesbaezluisfelipe@gmail.com')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Introduce el token JWT en este campo: Bearer <token>',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
