import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { DateRangeDto } from 'src/measurements/dto/date-range.dto';

@Injectable()
export class ParseDatePipe
  implements PipeTransform<DateRangeDto, DateRangeDto> {
  transform(
    timeRangeDto: DateRangeDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ): DateRangeDto {
    const { startDate, endDate } = timeRangeDto;

    if (startDate) {
      timeRangeDto.startDate = new Date(startDate);
    }

    if (endDate) {
      timeRangeDto.endDate = new Date(endDate);
    }

    return timeRangeDto;
  }
}
