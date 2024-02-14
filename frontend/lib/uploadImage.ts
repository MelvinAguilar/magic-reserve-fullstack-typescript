"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  url: string;
  secure_url: string;
}

export const getCloudImage = async (userId: string) => {
  const result = await cloudinary.search
    .expression(`public_id:magic-reserve-profile/${userId}`)
    .execute();

  return result.resources[0]; // return the first image
};

export const uploadCloudImage = async (userId: string, formData: FormData) => {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: `magic-reserve-profile/${userId}`,
          resource_type: "image",
          tags: ["magic-reserve-profile"],
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      )
      .end(buffer);
  });
};

export const UploadMultipleCloudImages = async (
  folderId: string,
  formData: FormData,
) => {
  const files = formData.getAll("file") as File[];

  const results = await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `magic-reserve/${folderId}`,
              resource_type: "image",
              tags: ["magic-reserve"],
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            },
          )
          .end(buffer);
      });
    }),
  );

  return results;
};
