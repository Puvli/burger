import AppHeader from "../components/AppHeader/AppHeader";
import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
} from "react-router-dom";
import styles from "./error.module.css";

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/login");
  };

  const onButtonClickBack = () => {
    navigate("/");
  };

  return (
    <>
      <AppHeader onClick={onButtonClick} />
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
