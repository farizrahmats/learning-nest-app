import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'fariz' })
  username: string;

  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;
}
