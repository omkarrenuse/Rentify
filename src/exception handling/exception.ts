import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateItemException extends HttpException {
  constructor(message?: string) {
    super(message || 'Duplicate item in the cart', HttpStatus.CONFLICT);
  }
}
