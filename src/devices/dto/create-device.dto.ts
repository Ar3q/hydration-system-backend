import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({
    description: 'Name of device, will be used as _id for document in MongoDB',
    example: 'pomps_device',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Additional description for device',
    example: 'Watering device, has 2 pomps',
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
