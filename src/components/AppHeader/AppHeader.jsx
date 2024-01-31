import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ProfileIcon,
  ListIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  NavLink as AnotherLink,
} from "react-router-dom";

const NavLink = ({ name, children, path }) => {
  return (
    <li className={`${styles.header__navLink} pl-5 pr-5`}>
      <AnotherLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? `${styles.header__navLink} pl-2 text text_type_main-default`
            : `${styles.header__navLink} pl-2 text text_type_main-default text_color_inactive`
        }
      >
        {children}
        {name}
      </AnotherLink>
    </li>
  );
};

const NavLinks = () => {
  // const navigate = useNavigate();
  const location = useLocation();

  const [constructorActive, setConstructorActive] = useState("primary");
  const [feedActive, setFeedActive] = useState("secondary");

  useEffect(() => {
    if (location.pathname === "/feed") {
      setFeedActive("primary");
      setConstructorActive("secondary");
    } else if (location.pathname === "/") {
      setFeedActive("secondary");
      setConstructorActive("primary");
    } else {
      setFeedActive("secondary");
      setConstructorActive("secondary");
    }
  }, [location.pathname]);

  return (
    <ul className={styles.header__navLinks}>
      <NavLink name="Констурктор" isActive={true} path="/" onClick={""}>
        <BurgerIcon type={constructorActive} />
      </NavLink>
      <NavLink name="Лента заказов" isActive={false} path="/feed">
        <ListIcon type={feedActive} />
      </NavLink>
    </ul>
  );
};

function AppHeader() {
  const [profileActive, setProfileActive] = useState("secondary");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      setProfileActive("primary");
    } else {
      setProfileActive("secondary");
    }
  }, [location.pathname]);

  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.header__container}`}>
        <NavLinks />
        <Logo />
        <NavLink name="Личный кабинет" isActive={false} path="/profile">
          <ProfileIcon type={profileActive} />
        </NavLink>
      </nav>
    </header>
  );
}

// проверка типов
NavLink.propTypes = {
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppHeader;
