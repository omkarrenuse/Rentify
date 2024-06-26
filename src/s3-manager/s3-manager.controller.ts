import { Controller, Get, Logger, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { S3ManagerService } from './s3-manager.service';
import { StreamUtils } from './stream.utils';
import { AuthService } from 'src/auth2/auth.service';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';


@Controller("")
// @ApiTags('S3')
@UseInterceptors(LoggingInterceptor)
export class ImageController {
  logger = new Logger('ImageController');

  constructor(private authService: AuthService, private readonly awsService: S3ManagerService) { }

  // @ApiOperation({ summary: 'Fetch Media of type image from S3' })
  @Get('media/*')
  async getImage(@Req() request: Request, @Res() response: Response) {
    const { inputStream, contentType, contextSize } = await this.awsService.getFileFromS3Bucket(request.url);

    response.setHeader('Content-Type', contentType)
    response.setHeader('Content-Length', contextSize)
    response.setHeader('Content-Disposition', 'inline'); 


    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    StreamUtils.copy(inputStream, response);
  }

  // @ApiOperation({ summary: 'Fetch Media of type vedio from S3' })
  @Get('video/*')
  async getVideo(@Req() request: Request, @Res() response: Response) {
    const { inputStream, contentType, contextSize } = await this.awsService.getFileFromS3Bucket(request.url);

    response.setHeader('Content-Type', contentType)
    response.setHeader('Content-Length', contextSize)
    response.setHeader('Content-Disposition', 'inline');


    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    StreamUtils.copy(inputStream, response);
  }
}