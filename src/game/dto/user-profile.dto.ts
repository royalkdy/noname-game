import { IsString, MinLength } from 'class-validator';

export class CreateUserProfileRequestDto {
  @IsString()
  @MinLength(2)
  nickname!: string;
}

export class CreateUserProfileResponseDto {
  nickname!: string;
}
