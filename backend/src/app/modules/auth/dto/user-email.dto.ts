import { IsEmail } from 'class-validator';
import { UserEmail } from '@modules/auth/interfaces/auth.interfaces';

export class UserEmailDto implements UserEmail {
  @IsEmail()
  value: string;
}
