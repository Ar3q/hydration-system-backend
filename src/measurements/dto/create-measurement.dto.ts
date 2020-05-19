import { IsNumber, Min, Max, IsOptional, IsBoolean } from 'class-validator';

export class CreateMeasurementDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4095)
  moisture: number;

  @IsOptional()
  @IsBoolean()
  liquidLevel: boolean;
}
