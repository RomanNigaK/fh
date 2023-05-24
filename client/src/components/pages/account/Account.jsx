import React, { useContext, useEffect, useState } from "react";
import Btn from "../../common/btn/Btn";
import Input from "../../common/input/Input";
import style from "./Account.module.css";
import man from "../../registration/svg/man.svg";
import girl from "../../registration/svg/girl.svg";
import { AuthCtx } from "../../../context/AuthContext";
import BtnEdit from "../../common/btnEdit/BtnEdit";
import InputFileLoad from "../../common/inputFileLoad/InputFileLoad";
import { useUpload } from "../../../hooks/useUpload";
import { useHttp } from "../../../hooks/http.hook";
import { useForm } from "react-hook-form";
import Submit from "../../common/submit/Submit";
import { useError } from "../../../hooks/error.hook";

export default function Account() {
  const context = useContext(AuthCtx);
  const [info, setinfo] = useState(context.info);

  const { loadFile, image } = useUpload(context.userID);
  const { loading, request } = useHttp();
  const { register, handleSubmit, setValue } = useForm();
  const textError = useError();
  const uploadFile = async (file) => {
    try {
      const img = await loadFile(file, "avatar", "/api/upload/file");
      context.info.image = img.filename;
    } catch (error) {
      textError(error);
    }
  };

  const upDate = async (body) => {
    try {
      const data = await request("/api/update/data", "POST", { ...body });
      context.info.name = data.name;
      context.info.password = data.password;
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    data.userid = context.userID;
    await upDate(data);
  };

  useEffect(() => {
    setinfo(context.info);
    setValue("name", info?.name || "");
    setValue("password", info?.password || "");
  }, [context.info, info]);

  if (!info) {
    return (
      <>
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className={style.account}>
        <div className={style.data}>
          <h3>Профиль пользователя</h3>

          <div className={style.info}>
            <div className={style.sex}>
              {info.sex === "man" ? (
                <img src={man} alt="мужчина" />
              ) : (
                <img src={girl} alt="мужчина" />
              )}
            </div>
            <div className={style.about}>
              <div className={style.items}>
                <table>
                  <tbody>
                    <tr>
                      <td>Имя:</td>
                      <td>{info.name}</td>
                    </tr>
                    <tr>
                      <td>Логин:</td>
                      <td>{info.login}</td>
                    </tr>
                    <tr>
                      <td>Password:</td>
                      <td>{info.password}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{info.email}</td>
                    </tr>
                    <tr>
                      <td>Дата рождения:</td>
                      <td>{info.birthday}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className={style.editData}>
          <h4>Редактируемые данные</h4>
          <div className={style.box}>
            <div className={style.photo}>
              <div className={style.edit}>
                <label htmlFor="reUploadFile">
                  <BtnEdit />
                </label>
              </div>
              {image ? (
                <img src={image.path} alt="фотгорафия профиля" />
              ) : (
                <img src={`/image/${info.image}`} alt="" />
              )}
            </div>
          </div>
          <InputFileLoad htmlid="reUploadFile" uploadFile={uploadFile} />
          <div className={style.box}>
            <div className={style.inputs}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.label}>Сменить имя</div>
                <Input
                  name="name"
                  placeholder="Имя"
                  data={info.name}
                  register={register}
                />
                <br />
                <div className={style.label}>Сменить пароль</div>
                <Input
                  name="password"
                  placeholder="Пароль"
                  data={info.password}
                  register={register}
                />
                <Submit id="submitForm" />
              </form>
            </div>
          </div>
          <div className={style.box}>
            <label htmlFor={!loading ? "submitForm" : null}>
              <Btn text="Изменить" loading={loading} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
