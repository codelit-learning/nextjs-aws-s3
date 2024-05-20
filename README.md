# Nextjs (app router + server actions) + AWS S3
This example gives you the starter code to start uploading files to AWS S3. All the uploaded files will be private.

## Getting Started

### Configure your AWS bucket
1. Create a new [S3 Bucket](https://console.aws.amazon.com/s3/).
2. Create an [IAM User](https://aws.amazon.com/iam/).
    - Select "Attach policies directly".
    - Add `s3:DeleteObject`, `s3:GetObject`, `s3:ListBucket`, `s3:PutObject`, `s3:PutObjectAcl`.
3. Save the access key and secret key for the IAM User.
    - Select the newly created user (IAM > Users > "your-user") and navigate to "Security Credentials".
    - Under "Access Keys", create a key and save this information. We will use this in the next step.
4. Create a `.env.local` file, similar to `.env.example`.
    - In your env.local file, use the information from your access key, along with the region and bucket name.
    - Do not adjust the naming of the keys, only input your values. [This is to ensure S3 Client can read them as defaults](https://docs.aws.amazon.com/sdkref/latest/guide/settings-reference.html).

#### Credentials and Environment Variables

AWS credentials (e.g. `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) and region configuration (e.g. `AWS_REGION`) can now be used directly as environment variables for Vercel deployments.

These variables are the default names expected by the AWS SDK, which means the user no longer has to configure credentials when using it. For example, this code is no longer necessary:

```js
const s3 = new S3Client({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
})
```

Instead, it can be replaced with this:

```
const client = new S3Client({ region: process.env.AWS_REGION });
```

[Source: AWS Environment Variable Default “Load Credential”](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html)

The SDK will pick up the credentials from the environment automatically.


### Start the dev server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start uploading.


> Based on [Vercel's Official Nextjs + AWS S3 Demo](https://github.com/vercel/examples/tree/main/solutions/aws-s3-image-upload)