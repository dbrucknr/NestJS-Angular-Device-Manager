import { IsString } from 'class-validator';
import { DisplayName } from '@modules/auth/interfaces/auth.interfaces';

export class DisplayNameDto implements DisplayName {
  @IsString()
  givenName: string;

  @IsString()
  familyName: string;
}
