import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ProfileIcon,
  ListIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NavLink = ({ isActive, name, children, onClick }) => {

  return (
    <li className={`${styles.header__navLink} pl-5 pr-5`}>
      {children}
      <p
        className={` ${
          !isActive && "text_color_inactive"
        } pl-2 text text_type_main-default`}
        onClick={onClick}
      >
        {name}
      </p>
    </li>
  );
};

const NavLinks = () => {
  return (
    <ul className={styles.header__navLinks}>
      <NavLink name="Констурктор" isActive={true}>
        <BurgerIcon type="primary" />
      </NavLink>
      <NavLink name="Лента заказов" isActive={false}>
        <ListIcon type="secondary" />
      </NavLink>
    </ul>
  );
};

function AppHeader() {
  const navigate = useNavigate();

  const onCabinetClick = () => {
    navigate("/profile");
  };

  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.header__container}`}>
        <NavLinks />
        <Logo />
        <NavLink
          name="Личный кабинет"
          isActive={false}
          onClick={onCabinetClick}
        >
          <ProfileIcon type="secondary" />
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
