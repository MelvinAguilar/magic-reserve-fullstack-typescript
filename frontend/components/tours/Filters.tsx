"use client";

import { SmallPinIcon } from "@/components/Icons";
import { applyTourFilters } from "@/lib/utils";
import { FiltersSchema } from "@/validations/FiltersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Button from "../Button";
import RatingStars from "../reviews/RatingStars";

type FiltersValues = {
  name?: string;
  difficulty?: string;
  priceFrom?: number | null;
  priceTo?: number | null;
  rating?: number | null;
  duration?: string;
  maxGroupSize?: number | null;
};

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const Filters = ({ searchParams }: SearchParamsProps) => {
  const router = useRouter();
  const [filterShow, setFilterShow] = useState(false);

  const defaultValues: FiltersValues = {
    name: searchParams.name || "",
    difficulty: searchParams.difficulty || "",
    priceFrom: searchParams["price[gte]"]
      ? parseInt(searchParams["price[gte]"])
      : null,
    priceTo: searchParams["price[lte]"]
      ? parseInt(searchParams["price[lte]"])
      : null,
    rating: searchParams["ratingsAverage[gte]"]
      ? parseInt(searchParams["ratingsAverage[gte]"])
      : null,
    duration: searchParams["duration[lte]"]
      ? (parseInt(searchParams["duration[lte]"]) / 7).toString()
      : "",
    maxGroupSize: searchParams.maxGroupSize
      ? parseInt(searchParams.maxGroupSize)
      : null,
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof FiltersSchema>>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FiltersValues> = (data) => {
    const filters = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== null && value !== "" && value !== undefined,
      ),
    );

    if (filters.priceFrom) {
      filters["price[gte]"] = filters.priceFrom;
      delete filters.priceFrom;
    }
    if (filters.priceTo) {
      filters["price[lte]"] = filters.priceTo;
      delete filters.priceTo;
    }

    if (filters.rating) {
      filters["ratingsAverage[gte]"] = filters.rating;
      delete filters.rating;
    }

    const newUrl = applyTourFilters({
      ...filters,
      page: searchParams.page || null,
      limit: searchParams.limit || null,
    });
    router.push(newUrl, { scroll: false });
  };

  const handlerReset = () => {
    reset({
      name: "",
      difficulty: "",
      priceFrom: null,
      priceTo: null,
      rating: null,
      maxGroupSize: null,
      duration: "",
    });
  };

  const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    toast.error("Please fill out all the required fields");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onInvalid={handleInvalid}
      className="w-full lg:mt-12"
    >
      <div className="grid w-full gap-y-4 rounded-lg border border-primary-light bg-white p-3 lg:grid-cols-9 lg:gap-x-3">
        <div className="relative lg:col-span-5">
          <input
            type="text"
            className="w-full rounded-lg border border-primary-light bg-light py-4 pl-10 pr-2 text-sm"
            placeholder="Search for tours"
            aria-label="Search for tours"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <SmallPinIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-primary-light" />
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="difficulty" className="sr-only">
            Difficulty
          </label>
          <select
            id="difficulty"
            className="h-full w-full rounded-lg border border-primary-light bg-light px-3 py-4 text-sm"
            {...register("difficulty")}
            aria-invalid={errors.difficulty ? "true" : "false"}
          >
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-primary-light md:w-auto lg:col-span-2"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
          Search
        </button>
      </div>
      <button
        type="button"
        className="my-4 font-poly text-lg font-bold tracking-tight underline"
        onClick={() => setFilterShow(!filterShow)}
      >
        {filterShow ? "Hide filters" : "Show more filters"}
      </button>
      <div
        className={`rounded-lg border border-primary-light bg-white p-8 ${filterShow ? "block" : "hidden"}`}
      >
        <div className="space-y-6">
          <h6 className="text-base font-medium text-black ">Prices</h6>
          <div className="col-span-2 flex items-center justify-between gap-4">
            <div className="w-full">
              <label
                htmlFor="price-from"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                From
              </label>
              <input
                type="number"
                id="price-from"
                min="1"
                max="10000"
                placeholder="Minimum price"
                className="w-full rounded-lg border border-primary-light bg-light px-3 py-4 text-sm"
                {...register("priceFrom")}
                aria-invalid={errors.priceFrom ? "true" : "false"}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price-to"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                To
              </label>
              <input
                type="number"
                id="price-to"
                min="1"
                max="10000"
                {...register("priceTo")}
                aria-invalid={errors.priceTo ? "true" : "false"}
                placeholder="Maximum price"
                className="w-full rounded-lg border border-primary-light bg-light px-3 py-4 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="mt-6 space-y-2">
            <h6 className="mb-2 text-base font-medium text-black">Rating</h6>

            {[5, 4, 3, 2, 1].map((value) => (
              <div key={value} className="flex items-center">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    id={`rating-${value}`}
                    value={value}
                    {...register("rating")}
                    checked={Number(watch("rating")) === value}
                    className="text-primary-600 h-4 w-4 cursor-pointer border-primary-light bg-gray-100"
                  />
                  <RatingStars small rating={value} />
                </label>
              </div>
            ))}
          </div>
          <div>
            <div className="mt-6">
              <label
                htmlFor="duration"
                className="mb-2 block text-base font-medium text-black "
              >
                Duration
              </label>
              <select
                id="duration"
                className="w-full cursor-pointer rounded-lg border border-primary-light bg-light px-3 py-4 text-sm"
                {...register("duration")}
                aria-invalid={errors.duration ? "true" : "false"}
              >
                <option value="">Duration</option>
                <option value="1">Less than 1 week</option>
                <option value="2">1-2 weeks</option>
                <option value="3">2-3 weeks</option>
                <option value="4">More than 3 weeks</option>
              </select>
            </div>
            <div className="mt-6">
              <label
                htmlFor="max-group-size"
                className="mb-2 block text-base font-medium text-black"
              >
                Max group size
              </label>
              <input
                id="max-group-size"
                type="number"
                min="1"
                max="100"
                className="w-full rounded-lg border border-primary-light bg-light px-3 py-4 text-sm"
                {...register("maxGroupSize")}
                placeholder="Maximun group size"
                aria-invalid={errors.maxGroupSize ? "true" : "false"}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button type="submit">Apply filters</Button>
          <Button type="button" secondary onClick={() => handlerReset()}>
            Clear all
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
