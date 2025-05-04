// Third Party Imports:
import * as session from 'express-session';
import * as passport from 'passport';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType, ConsoleLogger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { apiReference } from '@scalar/nestjs-api-reference';

// Local Imports:
import { AppModule } from '@/app/app.module';
// import { SwaggerDocument } from '@/swagger/swagger.document';

// To view Project Structure / Graph in Browser: npx @compodoc/compodoc -p tsconfig.json -s (http://127.0.0.1:8080/index.html)
// API Endpoint definitions: GET http://localhost:3000/docs
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger(),
  });
  // CORS Configuration:
  app.enableCors({ origin: 'http://localhost:4200', credentials: true });
  // Request / Response Validation:
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Incoming Request Globval Prefix:
  app.setGlobalPrefix('api');
  // App (Controller / Endpoint) Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Network Infrastructure Backend')
    .setDescription('Entrypoint for the Network Infrastructure Backend API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/api/reference',
    apiReference({
      content: document,
    }),
  );
  // Auth + Session Configuration Middleware:
  app.use(
    session({
      secret: 'some-secret',
      resave: false,
      saveUninitialized: false,
    }),
    passport.initialize(),
    passport.session(),
  );
  // Swagger API Docs Configuration:
  // const docs = new SwaggerDocument(app);
  // docs.initialize();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
