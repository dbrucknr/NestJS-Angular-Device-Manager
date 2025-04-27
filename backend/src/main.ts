import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app/app.module';
import { SwaggerDocument } from '@/swagger/swagger.document';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // To view Project Structure in Browser: npx @compodoc/compodoc -p tsconfig.json -s (http://127.0.0.1:8080/index.html)
  // API Endpoint definitions: GET http://localhost:3000/docs
  const docs = new SwaggerDocument(app);
  docs.initialize();
  // CORS Configuration:
  app.enableCors({ origin: 'http://localhost:4200', credentials: true });
  // Request / Response Validation:
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
