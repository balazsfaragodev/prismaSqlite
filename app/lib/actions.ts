"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const allowedFileTypes = ["image/jpeg", "image/png"];

const maxFileSize = 1048576 * 10; // 1 MB

type SignedURLResponse =
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined };

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
};
export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
}: GetSignedURLParams): Promise<SignedURLResponse> => {
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }
  const fileName = generateFileName();
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });
  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  );
  return { success: { url: url } };
};

export async function saveContact(id: string | null, formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const fileUrl = formData.get("fileUrl") as string;

  const operations = {
    create: () =>
      prisma.contact.create({
        data: { name, phone, email, fileUrl },
      }),
    update: () =>
      prisma.contact.update({
        where: { id: id! },
        data: { name, phone, email, fileUrl },
      }),
  };

  const operation = id ? operations.update() : operations.create();
  await operation;

  revalidatePath("/");
}

export const deleteOldImage = async (oldFileUrl: string) => {
  const key = oldFileUrl.split("/").slice(-1)[0];

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  };

  await s3Client.send(new DeleteObjectCommand(deleteParams));
};

//delete contact
export async function deleteContact(id: string) {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
      select: { fileUrl: true },
    });

    await prisma.contact.delete({ where: { id } });

    if (contact?.fileUrl) {
      const url = contact.fileUrl;
      const key = url.split("/").slice(-1)[0];

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      };

      await s3Client.send(new DeleteObjectCommand(deleteParams));
    }

    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }
}
