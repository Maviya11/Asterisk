import { useEffect, useState } from "react";
import { CanceledError } from "axios";

export const useData = <T>(
  serviceFunction: () => {
    getAll: () => { result: Promise<any>; cancel: () => void };
  }
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T[]>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const service = serviceFunction(); // Call the passed service function
    const { result, cancel } = service.getAll();

    result
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  return { isLoading, data, error, setData, setIsLoading, setError };
};
