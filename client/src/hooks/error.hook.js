import { useCallback } from "react";
export const useError = () => {
  return useCallback((textError) => {
    if (window.M && textError) {
      window.M.toast({ html: textError });
    }
  }, []);
};
