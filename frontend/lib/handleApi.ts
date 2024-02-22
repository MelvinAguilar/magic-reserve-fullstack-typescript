
import fetchData, { genericApi } from "./apiUtils";

export const getRecords = async (endpoint: string, count?: boolean) => {
  try {
    const response = await fetchData(endpoint);
    if (count) {
      return response;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRecord = async (endpoint: string, count?: boolean) => {
  try {
    const response = await fetchData(endpoint);
    if (count) {
      return response;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const handleApi = async (
  endpoint: string,
  method: string,
  data?: any,
) => {
  try {
    const response = await genericApi(endpoint, method, data);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
