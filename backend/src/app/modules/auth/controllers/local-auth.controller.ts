import type { Request } from 'express';
import { Controller, Post, UseGuards, Logger, Req } from '@nestjs/common';
import { LocalAuthGuard } from '@modules/auth/guards/local.guard';
import { AuthService } from '@modules/auth/services/auth.service';

@Controller({
  path: 'local-auth',
  version: '1',
})
export class LocalAuthController {
  private readonly logger = new Logger(LocalAuthController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }
}
