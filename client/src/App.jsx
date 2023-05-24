import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Window from "./components/window/Window";
import "materialize-css";
import "./index.css";
import { useAuth } from "./hooks/auth.hook";
import { AuthCtx } from "./context/AuthContext";
import Layout from "./components/pages/layout/Layout";
import Account from "./components/pages/account/Account";
import People from "./components/pages/people/People";
import Redirect from "./components/common/redirect/Redirect";

export default function App() {
  const { token, login, logout, userID, info, loading } = useAuth();

  const isAuth = !!token;
  return (
    <AuthCtx.Provider value={{ token, login, logout, userID, isAuth, info }}>
      {!isAuth ? (
        <Routes>
          <Route path="/" element={<Window view="enter" />} />
          <Route path="/reg" element={<Window view="registration" />} />
          <Route path="*" element={<Redirect url="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="account" element={<Account loading={loading} />} />
            <Route path="people" element={<People />} />
            <Route path="/" element={<Redirect url="/account" />} />
          </Route>
        </Routes>
      )}
    </AuthCtx.Provider>
  );
}
