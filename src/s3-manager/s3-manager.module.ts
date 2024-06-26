/* eslint-disable camelcase*/
import { Module } from '@nestjs/common';
import { S3ManagerService } from './s3-manager.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ImageController } from './s3-manager.controller';
import { AuthModule } from 'src/auth2/auth.module';


@Module({
    imports: [AuthModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                AWS_S3_BUCKET_ACCESS_KEY_ID: Joi.string(),
                AWS_S3_BUCKET_SECRET_ACCESS_KEY: Joi.string(),
                AWS_S3_BUCKET_REGION: Joi.string(),
                AWS_S3_BUCKET_NAME: Joi.string(),
                // AWS_S3_BuCKET_USER: Joi.string(),
            }),
        }),
        
    ],
    controllers: [ImageController],
    providers: [S3ManagerService],
    exports: [S3ManagerService],
})
export class S3ManagerModule { }
