import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateMeasurementDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  moisture: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  liquidLevel: number;
}
