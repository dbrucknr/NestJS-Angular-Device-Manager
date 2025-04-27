import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './swagger.config';
import { _SWAGGER_TAGS } from './swagger.constants';

export class SwaggerDocument {
  constructor(private readonly app: NestExpressApplication) {}

  private buildConfig() {
    const docBuilder = new DocumentBuilder()
      .setTitle('Network Infrastructure Backend')
      .setDescription('Entrypoint for the Network Infrastructure Backend API')
      .setVersion('1.0')
      .addBasicAuth()
      .addBearerAuth(
        {
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'JWTAuthorization',
      );

    // _SWAGGER_TAGS.forEach((tag) => {
    //   docBuilder.addTag(tag.name, tag.description);
    // });

    return docBuilder.build();
  }

  private createDocument() {
    const config = this.buildConfig();
    return SwaggerModule.createDocument(this.app, config);
  }

  public initialize() {
    const document = this.createDocument();

    const swaggerConfig = new SwaggerConfig();
    SwaggerModule.setup(
      'docs',
      this.app,
      document,
      swaggerConfig.customOptions,
    );
  }
}
