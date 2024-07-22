import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as AWS_S3 from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuidv4 } from 'uuid';
import { PassThrough, Readable } from 'stream';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import * as mime from 'mime-types';
import { Express } from 'express';


@Injectable()
export class S3ManagerService {
    logger = new Logger('S3ManagerService');
    private S3: AWS_S3.S3Client;
    private BUCKET: string;
    constructor() {
        this.S3 = new AWS_S3.S3Client({
            region: process.env.AWS_S3_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,

            }
        });
        this.BUCKET = process.env.AWS_S3_BUCKET_NAME;
    }


    /**
    * uploadMedia
    * @param employeeId 
    * @param dataBuffer 
    * @param filename 
    * @returns 
    */

    async uploadMedia(file: Express.Multer.File, filename: string): Promise<string> {
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'webp','heic'];
        const allowedVideoExtensions = ['mp4','mov'];
        const isImage = allowedImageExtensions.includes(fileExtension);
        const isVideo = allowedVideoExtensions.includes(fileExtension);

        if (!isImage && !isVideo) {
            throw new Error('Unsupported file type provided.Supported file formats are: .png, .jpg, .jpeg, .webp, .heic, .mp4, .mov');
        }
        const sanitizedFileName = filename.replace(/\s+/g, '');

        let filePath = `carrental/media/${uuidv4()}-${sanitizedFileName}`;
        const params = {
            Bucket: this.BUCKET, // pass your bucket name
            Key: filePath,
            Body: file.buffer,
            ContentType: file.mimetype,
            // ACL: 'public-read' as ObjectCannedACL,
        };


        const command = new PutObjectCommand(params)
        await this.S3.send(command);

        const basePath = process.env.CLOUDFRONTURL;

        return `${basePath}${filePath}`;
    }

    /**
     * uploadPrivateImageFile
     * @param dataBuffer 
     * @param filename 
     * @returns                                                       This can be used for profile pics
     */
    async uploadProfileImageFile(file: Express.Multer.File, filename: string): Promise<string> {
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        const allowedImageExtensions = ['png', 'jpg', 'jpeg','webp','heic'];
        const isImage = allowedImageExtensions.includes(fileExtension);

        if (!isImage) {
            throw new Error('Unsupported file type provided.Supported file formats are: .png, .jpg, .jpeg, .webp, .heic');
        }

        const sanitizedFileName = filename.replace(/\s+/g, ''); // Remove spaces
        const filePath = `dubaipost/profile_pic/${uuidv4()}-${sanitizedFileName}`;

        const params = {
            Bucket: this.BUCKET, // your bucket name
            Key: filePath,
            Body: file.buffer,
            ContentType: file.mimetype,
            // ACL: 'public-read' as ObjectCannedACL, // Ensure correct type for ACL
        };

        const command = new PutObjectCommand(params);
        await this.S3.send(command);

        const basePath = process.env.CLOUDFRONTURL;

        return `${basePath}${filePath}`;
    }

    /**
     * generatePresignedImageUrl method to generate pre-signed image URL for a given operation name.
     * @param key 
     * @returns 
     */
    async generatePresignedImageUrl(key: string) {
        const params = {
            Bucket: this.BUCKET,
            Key: `images/profile_images/${key}`
        }
        const command = new AWS_S3.GetObjectCommand(params);
        const url = await getSignedUrl(this.S3, command);
        return url;
    }


    /**
     * 
     * @param filepath 
     * @returns 
     */
    async getDownlodableUrl(filepath: string): Promise<object> {
        try {

            let path;
            // if (filepath.includes("image")) {
            //     path = filepath.split("/image/")
            // } else {
            //     path = filepath.split("/vedio/")
            // }
            path = filepath.split("/image/")

            const params1 = {
                Bucket: this.BUCKET,
                Key: path[length - 1],
                ResponseContentDisposition: 'inline',
                // Expires: 60,
            }
            const command1 = new AWS_S3.GetObjectCommand(params1);
            const url = await getSignedUrl(this.S3, command1);
            const result = await this.S3.send(command1);
            return result;
        }
        catch (error) {
            throw new HttpException(
                'Failed to generate URL',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getFileFromS3Bucket(key: string) {

        if (key.includes("image")) {
            key = key.split("/image/")[1]
        } else {
            key = key.split("/video/")[1]
        }
        const params = {
            Bucket: this.BUCKET,
            Key: key,

        };

        const getObjectCommand = new GetObjectCommand(params);
        const response = await this.S3.send(getObjectCommand);
        const passThrough = new PassThrough();
        (response.Body as Readable).pipe(passThrough);

        return {
            contentType: mime.lookup(key),
            inputStream: passThrough,
            contextSize: Number(response.ContentLength)
        }
    }



}