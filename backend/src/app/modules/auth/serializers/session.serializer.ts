import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ShibbolethUser } from '@modules/auth/interfaces/auth.interfaces';
import { ShibbolethUserDto } from '@modules/auth/dto/shibboleth-user.dto';

/** Type Guard to enforce the general data shape received from the Shibboleth OIDC Strategy */
function isShibbolethUser(response: any): response is ShibbolethUser {
  if (typeof response !== 'object' || response === null) return false;

  const data = response as Record<string, unknown>;
  return (
    typeof data.id === 'string' &&
    typeof data.displayName === 'string' &&
    typeof data.name === 'object' &&
    Array.isArray(data.emails)
  );
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private readonly logger = new Logger(SessionSerializer.name);

  async serializeUser(user: any, done: (err: Error | null, user: any) => void) {
    this.logger.log('Serializing user:', user);
    // Check the shape of the user object returned from the Shibboleth strategy
    if (!isShibbolethUser(user)) {
      this.logger.error('Invalid user object:', user);
      return done(new Error('Invalid user object'), null);
    }
    // Validate the user object's properties against some defined rules using class-validator + dto
    const shibbolethUser = plainToInstance(ShibbolethUserDto, user);
    const errors = await validate(shibbolethUser);
    if (errors.length > 0) {
      this.logger.error('Validation errors:', errors);
      return done(new Error('Validation failed'), null);
    }

    // TODO: Check the database for the user identity (pass to done)

    // Serialize the user object
    done(null, shibbolethUser);
  }

  async deserializeUser(
    user: any,
    done: (err: Error | null, user: any) => void,
  ) {
    this.logger.log('Deserializing user:', user);
    // Check the shape of the user object being checked in the session
    if (!isShibbolethUser(user)) {
      this.logger.error('Invalid user object:', user);
      return done(new Error('Invalid user object'), null);
    }
    // Validate the user object's properties against some defined rules using class-validator + dto
    const shibbolethUser = plainToInstance(ShibbolethUserDto, user);
    const errors = await validate(shibbolethUser);
    if (errors.length > 0) {
      this.logger.error('Validation errors:', errors);
      return done(new Error('Validation failed'), null);
    }

    // TODO: Check the database for the user identity (pass to done)

    // Deserialize the user object
    done(null, user);
  }
}
