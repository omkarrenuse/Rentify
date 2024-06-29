import { IsNotEmpty } from "class-validator"

export class AddVehicleDto{
    @IsNotEmpty()
    carLicenseNumber:string

    @IsNotEmpty()
    manufacturer:string

    @IsNotEmpty()
    carModel:string

    @IsNotEmpty()
    vehicleType:string

    @IsNotEmpty()
    vehicleCapacity:string

    @IsNotEmpty()
    basePrice:number

    @IsNotEmpty()
    PPH:number

    @IsNotEmpty()
    securityDeposit:number
}



// DB_URI = mongodb://localhost:27017/CarRentalApp

// PORT = 5000
// JWT_SECRET = codingwithomkar
// JWT_EXPIRES = 3d


// GOOGLE_CLIENT_ID = 538854083952-732gavq24mf2kiuf6v2d29v8v51qbgq3.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET = 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 

// AWS_S3_BUCKET_ACCESS_KEY_ID=AKIAZIR2JTTJ6UMZYF5Q
// AWS_S3_BUCKET_SECRET_ACCESS_KEY=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
// AWS_S3_BUCKET_REGION=us-east-2
// AWS_S3_BUCKET_NAME=static-storage-temp

// CLOUDFRONTURL = https://dga0e9w865l7q.cloudfront.net/





