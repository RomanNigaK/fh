import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ url }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (url) {
      navigate(url);
    } else {
      navigate(0);
    }
  });
  return <></>;
};
export default Redirect;
