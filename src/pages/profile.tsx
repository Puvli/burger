import {
  EmailInput,
  PasswordInput,
  Input,
  Tab,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/AppHeader/AppHeader";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
  useLocation,
} from "react-router-dom";
import styles from "./profile.module.css";
import {
  fetchGetUser,
  logOut,
  refreshToken,
  updToken,
  updateUserInformation,
} from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_SUCCESS,
  SET_IS_AUTH_CHECKED,
  UPDATE_SUCCESS,
} from "../services/actions/actions";
import { ICustomerState, IProfile } from "../services/types";

function Profile() {
  const location = useLocation();

  const [value, setValue] = React.useState<string>("");

  const [passwordValue, setPasswordValue] =
    React.useState<string>("bob@example.com");

  const [emailValue, setEmailValue] = React.useState<string>("");

  const customer = useSelector<IProfile>(
    (store) => store.customer
  ) as ICustomerState;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setEmailValue(customer.email);
    setValue(customer.name);
  }, [customer]);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  return (
    <>
      {/* <AppHeader /> */}
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <NavLink
            to={{ pathname: "/profile" }}
            className={`text text_type_main-medium  ${styles.tabParagraph} ${styles.tabParagraph_active}`}
          >
            Профиль
          </NavLink>
          {/* <p className={`text text_type_main-medium ${styles.tabParagraph}`}>
            Профиль
          </p> */}
          <NavLink
            to={{ pathname: "/profile/orders" }}
            className={`text text_type_main-medium text_color_inactive ${styles.tabParagraph}`}
          >
            История заказов
          </NavLink>
          <p
            className={`text text_type_main-medium text_color_inactive ${styles.tabParagraph}`}
            onClick={() => {
              logOut({ token: localStorage.getItem("refreshToken") }).then(
                (res) => {
                  if (res.success) {
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                    dispatch({ type: LOGOUT_SUCCESS });
                    navigate("/login");
                  }
                }
              );
            }}
          >
            Выход
          </p>
          <p
            className={`text text_type_main-default text_color_inactive mt-20 ${styles.tabSubParagraph}`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form
          className={styles.subcontainer}
          onSubmit={() => {
            console.log(value, emailValue);
            updateUserInformation(value, emailValue, passwordValue)
              .then((data) => {
                console.log("data", data);
                dispatch({ type: UPDATE_SUCCESS, payload: data.user });
              })
              .catch((err) => console.log("err", err));
          }}
        >
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={value}
            name={"name"}
            // error={false}
            // ref={inputRef}
            // onIconClick={onIconClick}
            // errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            icon="EditIcon"
          />
          <EmailInput
            onChange={onEmailChange}
            value={emailValue}
            name={"email"}
            isIcon={true}
          />
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={"password"}
            // extraClass="mb-6"
            icon="EditIcon"
          />
          <div
            className={
              value !== customer.name || emailValue !== customer.email
                ? `${styles.saveContainer}`
                : `${styles.container_none}`
            }
          >
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => {
                setEmailValue(customer.email);
                setValue(customer.name);
              }}
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profile;
