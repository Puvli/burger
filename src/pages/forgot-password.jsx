import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/AppHeader/AppHeader";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import styles from "./forgot-password.module.css";

function ForgotPassword() {
  // const emailValue = () => {
  const [value, setValue] = React.useState("bob@example.com");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // }

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/login");
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h2 className={`text text_type_main-large pb-6 ${styles.title}`}>
          Восстановление пароля
        </h2>
        <div className={styles.subcontainer}>
          <EmailInput onChange={onChange} name={"email"} isIcon={false} placeholder="Укажите e-mail" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="mb-20"
          >
            Восстановить
          </Button>
        </div>
        <div className={styles.login}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={styles.button}
            onClick={onButtonClick}
          >
            Войти
          </Button>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
