"use client";

import { CloudinaryResource, uploadCloudImage } from "@/lib/uploadImage";
import { useTransition } from "react";
import { toast } from "sonner";
import { UploadIcon } from "../Icons";

interface ImageUploadProps {
  userId: string;
  setImage: (res: CloudinaryResource) => void;
}

const ImageUpload = ({ userId, setImage }: ImageUploadProps) => {
  const [pending, startTransition] = useTransition();

  const handleSubmit = async (file: File) => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    try {
      startTransition(async () => {
        await uploadCloudImage(userId, form).then((res) => {
          setImage(res as CloudinaryResource);
          return res;
        });
      });
    } catch (error) {
      toast.error("Error uploading image"+ error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];

    if (selectedFile) {
      handleSubmit(selectedFile);
    }
  };

  return (
    <label
      htmlFor="dropzone-file"
      className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-8 hover:bg-gray-100 ${
        pending ? "pointer-events-none border-gray-700" : " border-gray-300 "
      }`}
    >
      {pending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-700/0">
          <p className="text-white">Uploading image to cloud...</p>
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center pb-6 pt-5">
        <UploadIcon  className="mb-4 h-8 w-8 text-gray-500" />
        <p className="mb-2 text-sm text-gray-500 ">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500 ">
          SVG, PNG or JPG 
        </p>
      </div>
      <input
        id="dropzone-file"
        name="image"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default ImageUpload;
