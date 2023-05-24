import React from "react";
import edit from "./svg/edit.svg";
export default function BtnEdit() {
  const style = {
    width: "25px",
    cursor: "pointer",
  };
  return (
    <>
      <img style={style} src={edit} alt="редактировать" />
    </>
  );
}
