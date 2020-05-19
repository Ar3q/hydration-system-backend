import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDeviceDto {
  @ApiPropertyOptional({
    description: 'Use if you want to change description of device',
    example: 'New description for my awesome device',
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
