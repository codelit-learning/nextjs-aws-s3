'use server'

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

export async function onSubmit(formData: FormData) {
    try {
        const client = new S3Client({
            region: process.env.AWS_REGION,
        })

        const { url, fields } = await createPresignedPost(client, {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: nanoid(),
        })

        const formDataS3 = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            formDataS3.append(key, value);
        })
        formDataS3.append('file', formData.get('file') as string);

        const uploadResponse = await fetch(url, {
            method: 'POST',
            body: formDataS3,
        })

        const response = await uploadResponse.text();
        console.log(response)

        if (uploadResponse.ok) {
            console.log('File uploaded successfully');
        } else {
            console.error('Failed to upload file');
        }
    } catch (err) {
        console.error(err);
    }
}