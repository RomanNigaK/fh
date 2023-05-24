import React from "react";
import { NavLink } from "react-router-dom";
import Btn from "../common/btn/Btn";
import Header from "../common/header/Header";
import Enter from "../enter/Enter";
import Registration from "../registration/Registration";
import style from "./Window.module.css";

export default function Window({ view }) {
  return (
    <div className={style.window}>
      <div className={style.panel}>
        <div className={style.header}>
          <Header />
        </div>
        <div className={style.title}>
          Социальная сеть <br /> фантастических героев
        </div>

        <div className={style.wrapeerBtn}>
          <NavLink to={view === "enter" ? "/reg" : "/"}>
            <Btn text={view === "enter" ? "Регистрация" : "Вход"} />
          </NavLink>
        </div>
      </div>
      <div className={style.content}>
        {view === "enter" ? <Enter /> : <Registration />}
      </div>
    </div>
  );
}
