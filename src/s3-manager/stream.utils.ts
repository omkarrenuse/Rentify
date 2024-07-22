import { PassThrough } from 'stream';
import { Response } from 'express';

export class StreamUtils {
  static copy(inputStream: PassThrough, response: Response) {
    inputStream.pipe(response);
  }
}