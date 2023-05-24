import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setloading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const res = await fetch(url, { method, body, headers });

        const data = await res.json();
        if (!res.ok) {
          let listErrors = "";
          if (data.errors) {
            for (let err of data.errors) {
              listErrors = err.msg + "<br/>" + listErrors;
            }
          }

          throw new Error(listErrors || data.message || "Что то пошло не так");
        }
        setloading(false);
        return data;
      } catch (error) {
        setloading(false);
        seterror(error.message);
        throw error;
      }
    },
    []
  );
  const clearError = useCallback(() => seterror(null), []);
  return { loading, request, error, clearError };
};
