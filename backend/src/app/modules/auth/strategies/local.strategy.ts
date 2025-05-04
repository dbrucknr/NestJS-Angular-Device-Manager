import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '@modules/auth/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    this.logger.log('Validating user credentials');
    const user: { username: string; name: string } | null =
      this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
