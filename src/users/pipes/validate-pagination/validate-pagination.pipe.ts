import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { page, limit } = value;

    if (page !== undefined) {
      const pageNumber = parseInt(page, 10);
      if (isNaN(pageNumber) || pageNumber <= 0) {
        throw new BadRequestException('Page must be a positive number.');
      }
      value.page = pageNumber;
    } else {
      value.page = 1;
    }

    if (limit !== undefined) {
      const limitNumber = parseInt(limit, 10);
      if (isNaN(limitNumber) || limitNumber <= 0) {
        throw new BadRequestException('Limit must be a positive number.');
      }
      value.limit = limitNumber;
    } else {
      value.limit = 10;
    }

    return value;
  }
}
