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
import { resetApi } from "../utils/api";

function ResetPassword() {
  // const emailValue = () => {
  const [value, setValue] = React.useState("bob@example.com");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("12345");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  // }

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/login");
  };

  const onClickReset = () => {
    resetApi({ password: passwordValue, token: value });
  };

  return (
    <>
      {/* <AppHeader /> */}
      <div className={styles.container}>
        <h2 className={`text text_type_main-large pb-6 ${styles.title}`}>
          Восстановление пароля
        </h2>
        <div className={styles.subcontainer}>
          <PasswordInput
            onChange={onPasswordChange}
            name={"password"}
            placeholder="Введите новый пароль"
            value={passwordValue}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={``}
            name={"name"}
            // error={false}
            // ref={inputRef}
            // onIconClick={onIconClick}
            // errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="mb-20 mt-6"
          onClick={onClickReset}
        >
          Сохранить
        </Button>
        <div className={styles.login_container}>
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
      </div>
    </>
  );
}

export default ResetPassword;
