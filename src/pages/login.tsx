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
import { loginApi } from "../utils/api";
import { useDispatch } from "react-redux";
import { logIn } from "../services/actions/actions";

function Login() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState<string>("bob@example.com");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/register");
  };

  const resetPassword = () => {
    navigate("/forgot-password");
  };

  const onEnterButton = () => {
    dispatch(logIn({ email: value, password: passwordValue }));
  };

  return (
    <>
      {/* <AppHeader /> */}
      <div className={styles.container}>
        <h2 className={`text text_type_main-large pb-6 ${styles.title}`}>
          Вход
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEnterButton();
          }}
          className={styles.subcontainer}
        >
          <EmailInput
            onChange={onChange}
            name={"email"}
            isIcon={false}
            value={value}
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
            // onClick={onEnterButton}
          >
            Войти
          </Button>
        </form>
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
