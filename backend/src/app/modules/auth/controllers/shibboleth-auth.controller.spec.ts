import { Test, TestingModule } from '@nestjs/testing';
import { ShibbolethAuthController } from '@modules/auth/controllers/shibboleth-auth.controller';
import { AuthService } from '@modules/auth/services/auth.service';

describe('ShibbolethAuthController', () => {
  let controller: ShibbolethAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShibbolethAuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<ShibbolethAuthController>(ShibbolethAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
