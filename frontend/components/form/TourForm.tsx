"use client";

import Input from "@/components/form/Input";
import {
  CloudinaryResource,
  UploadMultipleCloudImages,
} from "@/lib/uploadImage";
import { slugify } from "@/lib/utils";
import { Tour } from "@/types";
import { TourSchema } from "@/validations/TourSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import MultipleImageUpload from "../upload/MultipleImageUpload";

interface TourFormProps {
  type?: string;
  tour?: Tour;
}
const TourForm = ({ type, tour }: TourFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof TourSchema>>({
    resolver: zodResolver(TourSchema),
    defaultValues: {
      name: tour?.name || "",
      duration: tour?.duration || 0,
      maxGroupSize: tour?.maxGroupSize || 0,
      difficulty: tour?.difficulty || "",
      price: tour?.price || 0,
      priceDiscount: tour?.priceDiscount || 0,
      summary: tour?.summary || "",
      description: tour?.description || "",
      startLocation: {
        description: tour?.startLocation?.description || "",
        address: tour?.startLocation?.address || "",
        coordinates: [
          tour?.startLocation?.coordinates[0] || 0,
          tour?.startLocation?.coordinates[1] || 0,
        ],
      },
      locations: tour?.locations || [],
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const [coverIndex, setCoverIndex] = useState<number | null>(null);

  // To update a tour
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const handleSetCover = (url: string) => {
    setCoverUrl(url);
    if (coverIndex !== null) setCoverIndex(null);
  };

  const handleSetCoverFile = (index: number) => {
    setCoverIndex(index);
    if (coverUrl) setCoverUrl(null);
  };

  const handleRemoveImage = (url: string) => {
    setImageUrls(imageUrls.filter((image) => image !== url));
    if (coverUrl === url) setCoverUrl(null);
  };

  useLayoutEffect(() => {
    if (type === "edit" && tour) {
      setImageUrls([...tour.images, tour.imageCover]);

      setCoverUrl(tour.imageCover);
    }
  }, [type, tour]);

  const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.error("Please fill out all the required fields");

    showFilesError();
  };

  const showFilesError = () => {
    if (files.length + imageUrls.length < 4) {
      toast.error("You must upload at least four images");
      return true;
    }

    if (coverIndex === null && !coverUrl) {
      toast.error("You must select a cover image");
      return true;
    }

    return false;
  };

  const onSubmit: SubmitHandler<z.infer<typeof TourSchema>> = async (data) => {
    if (showFilesError()) {
      return;
    }

    const form = new FormData();
    files.forEach((file) => {
      form.append("file", file);
    });

    const { name } = data;

    const images = await UploadMultipleCloudImages(slugify(name), form)
      .then((results: unknown[]) => {
        const images = (results as CloudinaryResource[]).map(
          (result) => result.secure_url,
        );
        return images;
      })
      .catch((error) => {
        toast.error("Error uploading images");
        console.error("error", error);
        return [];
      });

    if (images.length === 0) return;

    let imageCover;
    if (coverIndex !== null) {
      imageCover = images[coverIndex];
    } else if (coverUrl) {
      imageCover = coverUrl;
    }

    const {
      duration,
      maxGroupSize,
      difficulty,
      price,
      priceDiscount,
      summary,
      description,
      startLocation,
      locations,
    } = data;

    const body = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      priceDiscount,
      summary,
      description,
      startLocation,
      locations,
      imageCover: imageCover || coverUrl,
      images: type === "create" ? images : imageUrls.concat(images),
    };

    const token = localStorage.getItem("session");

    fetch(`/api/tours`, {
      method: type === "create" ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Error ${type === "create" ? "creating" : "updating"} tour`,
          );
        }
        return res.json();
      })

      .then((data) => {
        if (data?.status === "success") {
          toast.success(`Tour ${type === "create" ? "created" : "updated"}`);
        } else {
          toast.error(
            `Error ${type === "create" ? "creating" : "updating"} tour: ${data?.message}`,
          );
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const [numDestinations, setNumDestinations] = useState(1);

  const handleNumDestinationsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setNumDestinations(parseInt(e.target.value));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onInvalid={handleInvalid}
      className="grid rounded-lg bg-white p-8 shadow-lg md:grid-cols-2 md:gap-x-8"
    >
      {errors && (
        <div>
          {Object.keys(errors).map((key) => {
            const errorMessage = (errors as Record<string, any>)[key].message;
            if (errorMessage === "Required") {
              return (
                <p key={key}>
                  {key} - {errorMessage}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
      <div className="md:col-span-2">
        <h1 className="mb-8 text-3xl font-bold">Create a new tour</h1>
      </div>
      <div>
        <Input
          innerRef={register("name")}
          name="name"
          type="text"
          placeholder="Name"
          errors={errors.name}
        />
      </div>
      <div>
        <Input
          innerRef={register("duration")}
          name="duration"
          type="number"
          placeholder="Duration"
          errors={errors.duration}
        />
      </div>
      <div>
        <Input
          innerRef={register("maxGroupSize")}
          name="maxGroupSize"
          type="number"
          placeholder="Max group size"
          errors={errors.maxGroupSize}
        />
      </div>
      <div>
        <label htmlFor="difficulty" className="sr-only">
          Difficulty
        </label>
        <select
          id="difficulty"
          className="border-primary-light bg-light mt-8 w-full rounded-lg border px-3 py-4"
          {...register("difficulty")}
          aria-invalid={errors.difficulty ? "true" : "false"}
        >
          <option value="">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>

        <div aria-live="polite" aria-atomic="true">
          {errors.difficulty && (
            <p
              id="difficulty-error"
              role="alert"
              className="mx-5 mt-2 text-sm font-semibold text-red-500"
            >
              {errors.difficulty.message || ""}
            </p>
          )}
        </div>
      </div>
      <div>
        <Input
          innerRef={register("price")}
          name="price"
          type="number"
          placeholder="Price"
          errors={errors.price}
        />
      </div>
      <div>
        <Input
          innerRef={register("priceDiscount")}
          name="priceDiscount"
          type="number"
          placeholder="Price discount"
          errors={errors.priceDiscount}
        />
      </div>

      <div className="md:col-span-2">
        <Input
          innerRef={register("summary")}
          name="summary"
          type="text"
          placeholder="Summary"
          errors={errors.summary}
        />
      </div>
      <div className="md:col-span-2">
        <Input
          innerRef={register("description")}
          name="description"
          type="text"
          placeholder="Description"
          errors={errors.description}
        />
      </div>

      <div className="bg-primary/5 mt-8 rounded-lg p-4 md:col-span-2">
        <p className="mb-4">Start Location</p>
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <Input
              innerRef={register("startLocation.description")}
              name="startLocation-description"
              type="text"
              placeholder="Description"
              errors={errors.startLocation?.description}
              className="!mt-2 !bg-white"
            />
          </div>
          <div>
            <Input
              innerRef={register("startLocation.address")}
              name="startLocation-address"
              type="text"
              placeholder="Address"
              errors={errors.startLocation?.address}
              className="!mt-2 !bg-white"
            />
          </div>
          <div>
            <Input
              innerRef={register("startLocation.coordinates.0")}
              name="startLocation-coordinates-1"
              type="text"
              placeholder="Latitude"
              errors={errors.startLocation?.coordinates?.[0]}
              className="!mt-2 !bg-white"
            />
          </div>

          <div>
            <Input
              innerRef={register("startLocation.coordinates.1")}
              name="startLocation-coordinates-2"
              type="text"
              placeholder="Longitude"
              errors={errors.startLocation?.coordinates?.[1]}
              className="!mt-2 !bg-white"
            />
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="numDestinations" className="mb-4 mt-8 block">
          Number of Destinations
        </label>
        <select
          id="numDestinations"
          className="border-primary-light bg-light w-full rounded-lg border px-3 py-4"
          value={numDestinations}
          onChange={handleNumDestinationsChange}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {[...Array(numDestinations)].map((_, index) => (
        <div
          key={index}
          className="bg-primary/5 mt-8 rounded-lg p-4 md:col-span-2"
        >
          <h2 className="my-4 text-xl font-semibold">
            Destination {index + 1}
          </h2>

          <Input
            innerRef={register(`locations.${index}.description`)}
            name={`location-description-${index}`}
            type="text"
            placeholder="Description"
            errors={errors.locations && errors.locations[index]?.description}
            className="!mt-2 !bg-white"
          />

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <Input
                innerRef={register(`locations.${index}.address`)}
                name={`location-address-${index}`}
                type="text"
                placeholder="Address"
                errors={errors.locations && errors.locations[index]?.address}
                className="!mt-2 !bg-white"
              />
            </div>
            <div>
              <Input
                innerRef={register(`locations.${index}.day`)}
                name={`location-day-${index}`}
                type="number"
                placeholder="Number of the day in the tour"
                errors={errors.locations && errors.locations[index]?.day}
                className="!mt-2 !bg-white"
              />
            </div>
            <div>
              <Input
                innerRef={register(`locations.${index}.coordinates.0`)}
                name={`location-coordinates-1${index}`}
                type="text"
                placeholder="Latitude"
                errors={
                  errors?.locations && errors.locations[index]?.coordinates?.[0]
                }
                className="!mt-2 !bg-white"
              />
            </div>

            <div>
              <Input
                innerRef={register(`locations.${index}.coordinates.1`)}
                name={`location-coordinates-2${index}`}
                type="text"
                placeholder="Longitude"
                errors={
                  errors?.locations && errors.locations[index]?.coordinates?.[1]
                }
                className="!mt-2 !bg-white"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="md:col-span-2">
        <p className="my-8">Upload images for the tour</p>
        <MultipleImageUpload
          files={files}
          setFiles={setFiles}
          coverIndex={coverIndex}
          setCoverIndex={setCoverIndex}
          handleSetCoverFile={handleSetCoverFile}
        />
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="border-primary/80 flex w-full flex-wrap gap-4 border-2 border-dashed bg-gray-50 p-4"
          >
            <Image
              src={url}
              alt={`Image ${index}`}
              className="aspect-square object-cover"
              width={80}
              height={80}
            />
            <p>
              Previosly uploaded image
              {coverUrl === url && (
                <span className="ml-4 text-green-500">Cover</span>
              )}
            </p>

            <button
              type="button"
              className="bg-primary/80 ml-auto h-fit rounded-lg px-4 py-2 text-white"
              onClick={() => handleSetCover(url)}
            >
              Set as Cover
            </button>
            <button
              type="button"
              className="border-primary text-primary h-fit rounded-lg border px-4 py-2"
              onClick={() => handleRemoveImage(url)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-primary-light mt-8 rounded-lg px-10 py-3 font-poly text-white transition-all"
      >
        Create tour
      </button>
    </form>
  );
};

export default TourForm;
