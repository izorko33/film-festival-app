import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface FetchData {
  data: any;
  error: AxiosError | null;
  isLoading: boolean;
}

const useFetch = (url: string, options?: AxiosRequestConfig): FetchData => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          process.env.REACT_APP_BACKEND_API + url,
          options
        );
        setData(response.data);
        setError(null);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
