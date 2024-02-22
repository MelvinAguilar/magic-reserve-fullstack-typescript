import { toast } from "sonner";
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
    toast.error((error as Error).message);
    return [];
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
    toast.error((error as Error).message);
    return {};
  }
};
