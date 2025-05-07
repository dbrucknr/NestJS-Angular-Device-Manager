import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ShibbolethUser } from '@modules/auth/interfaces/auth.interfaces';
import { DisplayNameDto } from '@modules/auth/dto/display-name.dto';
import { UserEmailDto } from '@modules/auth/dto/user-email.dto';

export class ShibbolethUserDto implements ShibbolethUser {
  @IsString()
  id: string;

  @IsString()
  displayName: string;

  @ValidateNested()
  @Type(() => DisplayNameDto)
  name: DisplayNameDto;

  @ValidateNested({ each: true })
  @Type(() => UserEmailDto)
  emails: UserEmailDto[];
}
