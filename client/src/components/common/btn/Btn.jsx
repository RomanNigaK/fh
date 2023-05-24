import React from "react";
import style from "./Btn.module.css";
export default function Btn({ text, loading }) {
  return (
    <div>
      <div
        className={
          loading ? style.wrapper + " " + style.disabled : style.wrapper
        }
      >
        {text}
      </div>
    </div>
  );
}
