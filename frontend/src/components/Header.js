/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../images/logo.svg";
import { Route, Link, Routes, useNavigate } from "react-router-dom";

import { useState } from "react";

function Header({ email, signOut }) {
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  const navigate = useNavigate();

  function openBurgerMenu() {
    setIsActiveBurger(!isActiveBurger);
  }

  return (
    <header className={isActiveBurger ? "header header_type_active" : "header"}>
      <img src={logo} alt="Логотип сайта" className="logo" />
      <Routes>
        <Route
          path="/signup"
          element={
            <Link to={"/signin"} className="header__auth">
              Войти
            </Link>
          }
        />
        <Route
          path="/signin"
          element={
            <Link to={"/signup"} className="header__auth">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <div
                className={
                  isActiveBurger
                    ? "header__nav header__nav_active"
                    : "header__nav"
                }
              >
                <p className="header__email">{email}</p>
                <button onClick={signOut} className="header__logout">
                  Выйти
                </button>
              </div>
              <button
                className={
                  isActiveBurger
                    ? " header__burger_active header__burger"
                    : "header__burger"
                }
                onClick={ openBurgerMenu }
              >
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
