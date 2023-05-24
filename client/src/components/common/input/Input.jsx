import React from "react";
import style from "./Input.module.css";
export default function Input({
  placeholder,
  name,
  register,
  type = "text",
  error = false,
}) {
  return (
    <>
      <div className={style.wrapper}>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          defaultValue=""
          {...register(name)}
        />
        {error && (
          <div className={style.error}>
            <svg
              width="6"
              height="16"
              viewBox="0 0 6 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L4.7101 7.30716C4.88972 7.61253 4.89437 7.99013 4.72232 8.29983L1 15"
                stroke="red"
              />
            </svg>
            {error}
          </div>
        )}
      </div>
    </>
  );
}
