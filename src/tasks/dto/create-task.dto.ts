import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'New Task' })
  title: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  completed?: boolean;
}
