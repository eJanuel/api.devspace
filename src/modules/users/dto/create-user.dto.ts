import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(8, { message: 'Min Length: 8 chars' })
    @MaxLength(30, { message: 'Max Length: 30 chars' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/, {
      message:
        ' A password at least contains one numeric digit, one supercase char and one lowercase char',
    })
    password: string;
  }
  