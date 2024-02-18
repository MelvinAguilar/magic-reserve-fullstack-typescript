import qs from "query-string";

interface URLQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: URLQueryParams) => {
  const currentURL = qs.parse(params);

  currentURL[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true },
  );
};

interface RemoveURLQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveURLQueryParams) => {
  const currentURL = qs.parse(params);

  keysToRemove.forEach((key) => delete currentURL[key]);

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true },
  );
};

interface TourFilters {
  [key: string]: string | number | boolean | null;
}

export const applyTourFilters = (filters: TourFilters) => {
  const currentURL = qs.parse(window.location.search);

  // Add keys from filters to currentQuery
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      currentURL[key] = String(value);
    }
  });

  // Delete keys from currentQuery if they are not present in filters
  Object.keys(currentURL).forEach((key) => {
    if (!(key in filters)) {
      delete currentURL[key];
    }
  });

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true },
  );
};

interface ConvertFilters {
  [key: string]: string | undefined;
}

export const filtersToStringServer = (filters: ConvertFilters) => {
  return qs.stringify(filters, { skipNull: true });
};

export const getTimestamp = (createdAt: string): string => {
  if (!createdAt) return "A long time ago";

  const createdAtDate = new Date(createdAt);
  const now = new Date();
  const timeDifference = now.getTime() - createdAtDate.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    return "Less than a minute ago";
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
