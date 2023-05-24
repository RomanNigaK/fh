import React from "react";

export default function Submit({ id }) {
  const style = {
    display: "none",
  };
  return <input style={style} type="submit" id={id} />;
}
