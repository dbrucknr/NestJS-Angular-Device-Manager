import { Get, Controller, Req, Redirect, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '@modules/auth/services/auth.service';
import { ShibbolethGuard } from '@modules/auth/guards/shibboleth.guard';

// Check if Session is required for proper auth handling
// https://github.com/nestjs/docs.nestjs.com/issues/237

// I may be doing too much on this controller, it looks like Passport and Express Request may be
// adding in some session handling for me.
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(ShibbolethGuard)
  login() {}

  @Get('callback')
  @UseGuards(ShibbolethGuard)
  @Redirect('http://localhost:4200', 301) // Check if the 301 is helpful (or if I can redirect back to the original page in the client)
  callback(@Req() request: Request) {
    const user = request.user;
    // Not 100% sure this actually does anything...does passport handle this for me?

    // Perhaps I should select the base URL from the request and redirect to that instead of hardcoding it
    // Could I also extract the original URL from the request and redirect to that instead of hardcoding it?
    // I think this might introduce a loop, since the callback comes from shibb login page...
    const redirectUrl = request.headers.referer || 'http://localhost:4200';

    if (user) {
      // request.session.user = user;
      return { message: 'Login successful', user, url: redirectUrl };
    } else {
      return { message: 'Login failed' };
    }
  }

  @Get('logout')
  logout(@Req() request: Request) {
    const session = request.session;
    if (session) {
      session.destroy((err) => {
        if (err) {
          console.error('Session destruction error:', err);
        } else {
          console.log('Session destroyed successfully');
        }
      });
    }
  }
}
