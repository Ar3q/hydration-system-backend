import { IsNumber, Min, Max, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMeasurementDto {
  @ApiPropertyOptional({
    description: 'Moisture given by sensor',
    example: 997,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4095)
  moisture: number;

  @ApiPropertyOptional({
    description: 'Is sensor detecting water',
    examples: [true, false],
  })
  @IsOptional()
  @IsBoolean()
  liquidLevel: boolean;
}
