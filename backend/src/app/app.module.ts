// Native Dependencies
import { join } from 'path';
// Third Party Dependencies
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
// Local Dependencies
import { AuthModule } from '@modules/auth/auth.module';
import { Device } from '@modules/devices/entities/device.entity';
import { DeviceChangelog } from '@modules/devices/entities/device-changelog.entity';
import { DevicesModule } from '@modules/devices/devices.module';
import { DeviceFixtures } from '@modules/devices/fixtures/device.fixtures';

@Module({
  imports: [
    // Local Modules:
    DevicesModule,
    AuthModule,
    // Database ORM (Consider moving to a separate module):
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [Device, DeviceChangelog],
        synchronize: true, // This is for development only, do not use in production
        logging: true, // Enable query logging
      }),
    }),
    // For Custom Swagger GUI Assets:
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'static'),
      serveRoot: '/static',
    }),
    // Event Driven Architecture:
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [DevicesModule],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly deviceFixtures: DeviceFixtures) {}

  async onModuleInit() {
    // Create fixtures (I wonder if this would be better suited as a CLI command?)
    const fixtures = await this.deviceFixtures.persist(800);
    console.log('Fixtures created:', fixtures);
  }
}
