"use client";

import Input from "@/components/form/Input";
import { handleApi } from "@/lib/handleApi";
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
import { Title } from "../Title";
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
      duration: tour?.duration || undefined,
      maxGroupSize: tour?.maxGroupSize || undefined,
      difficulty: tour?.difficulty || "",
      price: tour?.price || undefined,
      priceDiscount: tour?.priceDiscount || undefined,
      summary: tour?.summary || "",
      description: tour?.description || "",
      startLocation: {
        description: tour?.startLocation?.description || "",
        address: tour?.startLocation?.address || "",
        coordinates: [
          tour?.startLocation?.coordinates[0] || undefined,
          tour?.startLocation?.coordinates[1] || undefined,
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
      startDates,
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
      startDates,
      imageCover: imageCover || coverUrl,
      images: type === "create" ? images : imageUrls.concat(images),
    };

    await handleApi(
      "/tours" + (type === "create" ? "" : `/${tour?.id}`),
      type === "create" ? "POST" : "PATCH",
      body,
    ).then((data) => {
      if (data?.status === "success")
        toast.success(`Tour ${type === "create" ? "created" : "updated"}`);
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
      <div className="md:col-span-2">
        <Title as="h1" className="mb-8 text-3xl font-bold">
          Create a new tour
        </Title>
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
          className="mt-8 w-full rounded-lg border border-primary-light bg-light px-3 py-4"
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

      <div className="mt-8 rounded-lg bg-primary/5 p-4 md:col-span-2">
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
          className="w-full rounded-lg border border-primary-light bg-light px-3 py-4"
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
          className="mt-8 rounded-lg bg-primary/5 p-4 md:col-span-2"
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

            <div className="col-span-2">
              <Input
                innerRef={register(`startDates.${index}`)}
                name={`location-day-${index}`}
                type="date"
                placeholder="Day"
                errors={errors.startDates && errors.startDates[index]}
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
            className="flex w-full flex-wrap gap-4 border-2 border-dashed border-primary/80 bg-gray-50 p-4"
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
              className="ml-auto h-fit rounded-lg bg-primary/80 px-4 py-2 text-white"
              onClick={() => handleSetCover(url)}
            >
              Set as Cover
            </button>
            <button
              type="button"
              className="h-fit rounded-lg border border-primary px-4 py-2 text-primary"
              onClick={() => handleRemoveImage(url)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-8 rounded-lg bg-primary px-10 py-3 font-poly text-white transition-all hover:bg-primary-light"
      >
        Create tour
      </button>
    </form>
  );
};

export default TourForm;
