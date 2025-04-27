import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from '@modules/devices/controllers/devices.controller';
import { DevicesService } from '@modules/devices/services/devices.service';

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [DevicesService],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
