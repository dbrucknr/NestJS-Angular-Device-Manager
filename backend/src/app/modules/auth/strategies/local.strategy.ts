import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '@modules/auth/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email', // Use 'email' instead of 'username'
      // passwordField: 'secret', // Use 'secret' instead of 'password'
    });
  }

  validate(email: string, password: string) {
    this.logger.log('Validating user credentials');
    const user: { id: string; email: string } | null =
      this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
