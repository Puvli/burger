import {
  EmailInput,
  PasswordInput,
  Input,
  Tab,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/AppHeader/AppHeader";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
} from "react-router-dom";
import styles from "./profile.module.css";

function Profile() {
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
        <div className={styles.tabContainer}>
          <NavLink
            to={{pathname: '/profile'}}
            className={`text text_type_main-medium  ${styles.tabParagraph} ${styles.tabParagraph_active}`}
          >
            Профиль
          </NavLink>
          {/* <p className={`text text_type_main-medium ${styles.tabParagraph}`}>
            Профиль
          </p> */}
          <p
            className={`text text_type_main-medium text_color_inactive ${styles.tabParagraph}`}
          >
            История заказов
          </p>
          <p
            className={`text text_type_main-medium text_color_inactive ${styles.tabParagraph}`}
          >
            Выход
          </p>
          <p
            className={`text text_type_main-default text_color_inactive mt-20 ${styles.tabSubParagraph}`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
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
            icon="EditIcon"
          />
          <EmailInput onChange={onChange} name={"email"} isIcon={true} />
          <PasswordInput
            onChange={onChange}
            name={"password"}
            extraClass="mb-6"
            icon="EditIcon"
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
