import React from "react";
import style from "./InputFileLoad.module.css";
export default function InputFileLoad({ uploadFile, htmlid }) {
  return (
    <>
      <input
        id={htmlid}
        className={style.fileinput}
        type="file"
        onChange={(e) => uploadFile(e.target.files[0])}
      />
    </>
  );
}
