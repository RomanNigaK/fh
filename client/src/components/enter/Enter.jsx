import React, { useContext, useEffect } from "react";
import Btn from "../common/btn/Btn";
import Input from "../common/input/Input";
import style from "./Enter.module.css";
import { useForm } from "react-hook-form";
import Submit from "../common/submit/Submit";
import { useHttp } from "../../hooks/http.hook";
import { useError } from "../../hooks/error.hook";
import { AuthCtx } from "../../context/AuthContext";

export default function Enter() {
  const { register, handleSubmit } = useForm();
  const { loading, error, clearError, request } = useHttp();
  const context = useContext(AuthCtx);

  const textError = useError();
  const authHandler = async (body) => {
    try {
      const data = await request("/api/auth/login", "POST", { ...body });

      context.login(data.token, data.userId, data.info);
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    authHandler(data);
  };

  useEffect(() => {
    textError(error);
    clearError();
  }, [error, textError, clearError]);

  return (
    <div className={style.wrapper}>
      <div className={style.enter}>
        <div className={style.header}>Вход</div>
        <div className={style.data}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Логин" name="login" register={register} />
            <Input
              placeholder="Пароль"
              name="password"
              register={register}
              type="password"
            />
            <Submit id="submitFormAuth" />
          </form>
        </div>
        <div className={style.wrapperBtn}>
          <label htmlFor={!loading ? "submitFormAuth" : null}>
            <Btn text="Вход" loading={loading} />
          </label>
        </div>
      </div>
    </div>
  );
}
