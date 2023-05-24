import { useCallback, useState } from "react";

export const useUpload = (userID = null) => {
  const [image, setimage] = useState(null);
  const [fileName, setfileName] = useState(null);
  const [err, seterr] = useState(null);
  const loadFile = useCallback(async (file, field, url) => {
    try {
      const formData = new FormData();

      formData.append(field, file);
      if (userID) {
        formData.append("userid", userID);
      }

      const data = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const img = await data.json();

      if (!data.ok) {
        seterr(img.message);
        throw new Error(
          img.message || "Что то пошло не так при загрузке фаила"
        );
      }

      setimage(img);
      setfileName(img.filename);

      return img;
    } catch (error) {
      throw error;
    }
  }, []);

  return { loadFile, image, fileName };
};
