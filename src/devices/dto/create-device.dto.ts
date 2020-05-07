import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}
