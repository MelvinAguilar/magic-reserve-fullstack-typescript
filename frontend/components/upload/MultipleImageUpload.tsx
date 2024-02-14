"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { UploadIcon } from "../Icons";

interface ImageUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
  coverIndex: number | null;
  setCoverIndex: (index: number | null) => void;
  handleSetCoverFile: (index: number) => void;
}

const MultipleImageUpload = ({
  files,
  setFiles,
  coverIndex,
  setCoverIndex,
  handleSetCoverFile,
}: ImageUploadProps) => {
  const [pending, startTransition] = useTransition();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target?.files;
    if (!selectedFiles) return;

    const newFiles: File[] = Array.from(selectedFiles);
    setFiles([...files, ...newFiles]);

    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    if (index === coverIndex) {
      setCoverIndex(null);
    }
  };

  return (
    <>
      <label
        htmlFor="dropzone-file"
        className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-8 hover:bg-gray-100 ${
          pending ? "pointer-events-none border-gray-700" : "  border-primary"
        }`}
      >
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
          multiple
        />
      </label>

      <div className="mt-2 flex w-full flex-wrap justify-center gap-4">
        {imagePreviews.map((preview, index) => (
          <div
            key={index}
            className="flex w-full flex-wrap gap-4 border-2 border-dashed border-primary/80 bg-gray-50 p-4"
          >
            <Image
              src={preview}
              alt={`Preview ${index}`}
              className="aspect-square object-cover"
              width={80}
              height={80}
            />
            <p>
              {files[index]?.name}

              {coverIndex === index && (
                <span className="ml-4 text-green-500">Cover</span>
              )}
            </p>

            <button
              type="button"
              className="ml-auto h-fit rounded-lg bg-primary/80 px-4 py-2 text-white"
              onClick={() => handleSetCoverFile(index)}
            >
              Set as Cover
            </button>
            <button
              type="button"
              className="h-fit rounded-lg border border-primary px-4 py-2 text-primary"
              onClick={() => handleRemoveFile(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultipleImageUpload;
