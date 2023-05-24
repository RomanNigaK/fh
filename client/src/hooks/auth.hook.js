import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "./http.hook";

const storage = "dataUser";

export const useAuth = () => {
  const [token, settoken] = useState(null);
  const [userID, setuserID] = useState(null);
  const [info, setinfo] = useState(null);
  const { request, loading } = useHttp();
  const navigate = useNavigate();

  const login = useCallback((jwt, id, info) => {
    settoken(jwt);
    setuserID(id);
    setinfo(info);

    localStorage.setItem(
      storage,
      JSON.stringify({
        userID: id,
        token: jwt,
      })
    );
  }, []);

  const logout = useCallback(() => {
    settoken(null);
    setuserID(null);
    localStorage.removeItem(storage);
    navigate("/");
  }, []);

  const getDataUser = useCallback(
    async (tkn) => {
      try {
        const data = await request("/api/auth/user", "POST", null, {
          Authorization: `Bearer ${tkn}`,
        });

        setinfo(data);
      } catch (error) {
        settoken(null);
        setuserID(null);
        localStorage.removeItem(storage);
        throw new Error("token не действителен");
      }
    },
    [request]
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storage));

    if (data && data.token) {
      if (!info) {
        getDataUser(data.token);
      }
      login(data.token, data.userID);
    }
  }, [login, getDataUser]);

  return { login, logout, token, userID, info, loading };
};
