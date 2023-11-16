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
import styles from "./login.module.css";

function Login() {
  // const emailValue = () => {
  const [value, setValue] = React.useState("bob@example.com");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // }

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/register");
  };

  const resetPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h2 className={`text text_type_main-large pb-6 ${styles.title}`}>
          Вход
        </h2>
        <div className={styles.subcontainer}>
          <EmailInput onChange={onChange} name={"email"} isIcon={false} />
          <PasswordInput
            onChange={onChange}
            name={"password"}
            extraClass="mb-6"
          />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="mb-20"
        >
          Войти
        </Button>
        <div className={styles.login_container}>
          <div className={styles.login}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass={styles.button}
              onClick={onButtonClick}
            >
              Зарегистрироваться
            </Button>
          </div>
          <div className={styles.login}>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </p>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass={styles.button}
              onClick={resetPassword}
            >
              Восстановить пароль
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
