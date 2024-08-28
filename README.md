# PrismaSqlite Contacts Management CRUD Web App

A simple Employee Management System with **TypeScript, Prisma, Sqlite3, Tailwind CSS**.

## How to Setup

Follow these steps to set up and run the Employee Management System on your local machine:

1. Clone the repository:

```bash
git clone https://github.com/balazsfaragodev
cd prismaSqlite-contact-crud
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database (Environment Configuration)
   Create a file named .env in the root directory and add your database URL. For temporary use:

```bash
DATABASE_URL="file:./prisma/dev.db"
```

4. Run the migrations:

```bash
npx prisma migrate dev
```

5. To run the prisma studio:

```bash
npx prisma studio
```

prisma running at http://localhost:5555

6. Make a AWS S3 database with put and delete

Bucket policy

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::{your s3 folder}/*"
        }
    ]
}
```

CORS set

```bash
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "GET"
        ],
        "AllowedOrigins": [
            "http://localhost:3000"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

7. ADD AWS S3 environment variables to the project

```bash
AWS_BUCKET_NAME=
AWS_BUCKET_REGION=
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
```

8. Start the development server:

```bash
npm run dev
```

The application should now be running at http://localhost:3000.

## Following libraries that were used

- **NEXTJS**: The React framework used for building the web application.
- **TypeScript**: A superset of JavaScript that adds static typing to the language.
- **Prisma**: A database toolkit for Node.js and TypeScript that integrates with various databases.
- **Sqlite3**: A self-contained, serverless, and zero-configuration database engine.
- **aws-sdk**: Tools to integrate AWS services like S3 and DynamoDB directly into your application.
- **framer-motion**: A library for creating smooth animations in React apps with ease.
- **jotai**: A simple state management library for React, using atomic state units.

#### Feel free to explore and enhance the application further. Thank you!
