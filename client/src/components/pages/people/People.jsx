import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthCtx } from "../../../context/AuthContext";
import { useAuth } from "../../../hooks/auth.hook";
import { useHttp } from "../../../hooks/http.hook";
import style from "./People.module.css";
export default function People() {
  const { request } = useHttp();
  const { token } = useAuth();
  const [users, setusers] = useState([]);
  const context = useContext(AuthCtx);
  const [data, setdata] = useState(new Date());

  const people = useCallback(
    async (tkn) => {
      try {
        const response = await request("api/people/all", "POST", null, {
          Authorization: `Bearer ${tkn}`,
        });
        setusers(response.people);
      } catch (error) {}
    },
    [request]
  );
  useEffect(() => {
    people(token);
  }, [people, token]);

  return (
    <div className={style.people}>
      {!users.length ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : null}
      {users.map((user, i) => {
        if (user.login !== context.info.login) {
          return (
            <div key={i}>
              <Man
                name={user.name}
                img={user.image}
                birthday={user.birthday}
                data={data}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

function Man({ name, img, birthday, data }) {
  const [userBirthday, setuserBirthday] = useState(birthday.split("."));
  const old = () => {
    let age = data.getFullYear() - userBirthday[2];
    if (userBirthday[1] < data.getMonth() + 1) {
      age++;
    }
    return age;
  };
  const [age, setage] = useState(old());

  const ext = () => {
    if (age) {
      const a = age.toString().split("");
      if ([11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(age)) return "лет";
      if (a[a.length - 1] === "1") return "год";
      if (["2", "3", "4"].includes(a[a.length - 1])) return "года";
      return "лет";
    }
  };

  return (
    <div className={style.item}>
      <div className={style.box}>
        <div className={style.photo}>
          {img ? <img src={`/image/${img}`} alt={img} /> : null}
        </div>
      </div>
      <div className={style.box}>
        <div className={style.name}>{name}</div>
      </div>
      <div className={style.box}>
        <div className={style.age}>
          {age} {ext()}
        </div>
      </div>
    </div>
  );
}
