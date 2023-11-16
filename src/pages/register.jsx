import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/AppHeader/AppHeader";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import styles from "./register.module.css";

function Register() {
  // const emailValue = () => {
  const [value, setValue] = React.useState("bob@example.com");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // }

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/login')
  }

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h2 className={`text text_type_main-large pb-6 ${styles.title}`}>
          Регистрация
        </h2>
        <div className={styles.subcontainer}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setValue(e.target.value)}
            // value={value}
            name={"name"}
            // error={false}
            // ref={inputRef}
            // onIconClick={onIconClick}
            // errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
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
          Зарегистрироваться
        </Button>
        <div className={styles.login}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Button htmlType="button" type="secondary" size="medium" extraClass={styles.button} onClick={onButtonClick}>
            Войти
          </Button>
        </div>
      </div>
    </>
  );
}

export default Register;
