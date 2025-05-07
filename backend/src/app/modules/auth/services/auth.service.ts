import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// Replace this
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  // Mock database (for PoC)
  private readonly localUsers = [
    {
      id: 'dbrucknr',
      email: 'dbrucknr@umich.edu',
      password: 'change-me',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  findOne(email: string) {
    return this.localUsers.find((user) => user.email === email);
  }

  validateUser(
    id: string,
    password: string,
  ): { email: string; id: string } | null {
    const user = this.findOne(id);
    if (user && user.password === password) {
      const filteredUser = { ...user, password: undefined };
      return filteredUser;
    }
    return null;
  }

  login(user: { id: string; name: string }) {
    const payload = { id: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
