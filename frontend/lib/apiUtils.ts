import { setCookie, getCookie, deleteCookie } from "cookies-next";

const fetchData = async (endpoint: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const token = getCookie("session");

    const res = await fetch(url + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (data?.status === "success") {
      return data;
    } else {
      throw new Error("Error fetching data: " + data?.message);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const postData = async (endpoint: string, data: any) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const token = getCookie("session");

    const res = await fetch(url + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData?.status === "success") {
      return responseData;
    } else {
      throw new Error(responseData?.message || "Error posting data");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const genericApi = async (
  endpoint: string,
  method: string,
  data?: any,
) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const token = getCookie("session");

    const res = await fetch(url + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData?.status === "success") {
      return responseData;
    } else {
      throw new Error(responseData?.message || "Error handling API");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default fetchData;
