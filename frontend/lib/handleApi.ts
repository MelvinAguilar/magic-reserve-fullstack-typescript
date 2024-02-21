import { toast } from "sonner";
import fetchData, { genericApi } from "./apiUtils";

export const getRecords = async (endpoint: string) => {
    try {
      const response = await fetchData(endpoint);
      return response.data;
    } catch (error) {
      toast.error((error as Error).message);
      return [];
    }
  };


export const handleApi = async (endpoint: string, method: string, data?: any) => {
    try {
        const response = await genericApi(endpoint, method, data);
        return response;
    } catch (error) {
        toast.error((error as Error).message);
        return {};
    }
}
  

