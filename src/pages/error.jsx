import AppHeader from "../components/AppHeader/AppHeader";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
} from "react-router-dom";
import styles from "./error.module.css";

function ErrorPage() {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/login");
  };

  const onButtonClickBack = () => {
    navigate("/");
  };

  return (
    <>
      <AppHeader onClcik={onButtonClick} />
      <div className={styles.container}>
        <p className="text text_type_main-large">
          У Вас нет доступа к этой странице;{"("}
        </p>
        <p
          className={`text text_type_main-large text_color_inactive ml-2 ${styles.back}`}
          onClick={onButtonClickBack}
        >
          Вернуться назад
        </p>
      </div>
    </>
  );
}

export default ErrorPage;
