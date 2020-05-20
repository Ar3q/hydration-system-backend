import { IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class DateRangeDto {
  @IsOptional()
  @IsDate()
  @Transform(stringDate => new Date(stringDate))
  startDate: Date;

  @IsOptional()
  @IsDate()
  @Transform(stringDate => new Date(stringDate))
  endDate: Date;
}
