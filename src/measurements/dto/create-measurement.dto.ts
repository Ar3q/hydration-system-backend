import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateMeasurementDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  readonly moisture: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly liquidLevel: number;
}
