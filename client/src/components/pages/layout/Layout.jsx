import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthCtx } from "../../../context/AuthContext";

import style from "./Layout.module.css";
export default function Layout() {
  const context = useContext(AuthCtx);

  return (
    <div className={style.body}>
      <div className={style.header}>
        <div className={style.leftHeader}>
          <div className={style.logo}>FantasticHeroes</div>
          <div className={style.nav}>
            <div className={style.item}>
              <Link to="/people"> Список героев</Link>
            </div>
          </div>
        </div>
        <div className={style.rightHeader}>
          <div className={style.exit} onClick={() => context.logout()}>
            Выход
          </div>
          <Link to="/account">
            <div className={style.avatar}>
              {context.info ? (
                <img src={`/image/${context.info.image}`} alt="avatar" />
              ) : null}
            </div>
          </Link>
        </div>
      </div>

      <div className={style.page}>
        <Outlet />
      </div>
    </div>
  );
}
