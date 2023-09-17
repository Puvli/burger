import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ProfileIcon,
  ListIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const NavLink = ({ isActive, name, children }) => {
  return (
    <li className={`${styles.header__navLink} pl-5 pr-5`}>
      {children}
      <p
        className={` ${
          !isActive && "text_color_inactive"
        } pl-2 text text_type_main-default`}
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
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.header__container}`}>
        <NavLinks />
        <Logo />
        <NavLink name="Личный кабинет" isActive={false}>
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
