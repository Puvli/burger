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
import styles from "./register.module.css";
import { registerApi } from "../utils/api";
import { makeRegistration } from "../services/actions/actions";
import { useDispatch } from "react-redux";

function Register() {
  // const emailValue = () => {
  const [value, setValue] = React.useState("example");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("bob@example.com");
  // const inputRef = React.useRef(null);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  // }

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/login");
  };

  const registerObj = {
    email: emailValue,
    password: passwordValue,
    name: value,
  };

  const onRegister = () => {
    dispatch(makeRegistration(registerObj));
  };

  return (
    <>
      {/* <AppHeader /> */}
      <div className={styles.container}>
        <h2 className={`text text_type_main-large pb-6 ${styles.title}`}>
          Регистрация
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onRegister();
          }}
          className={styles.subcontainer}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={"name"}
            size={"default"}
            extraClass="ml-1"
          />
          <EmailInput
            onChange={onEmailChange}
            name={"email"}
            isIcon={false}
            value={emailValue}
          />
          <PasswordInput
            onChange={onPasswordChange}
            name={"password"}
            // extraClass="mb-6"
            value={passwordValue}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass="mb-20"
            // onClick={onRegister}
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.login}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
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

export default Register;
