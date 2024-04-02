import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FC, ReactNode } from "react";
import { ICustomerState, IProtected, ProtectedProps } from "../../services/types";

const Protected: FC<ProtectedProps> = ({ onlyUnAuth = false, component }) => {
  const customer = useSelector<IProtected>(
    (store) => store.customer
  ) as ICustomerState;
  const location = useLocation();

  // if (!customer.isAuthChecked) {
  //   return null; // здесь можно вернуть прелоадер. Глянуть в библиотеке
  // }

  if (onlyUnAuth && customer.email && customer.name) {
    const { from } = location.state || { from: { pathname: "/" } };
    console.log(from);
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !customer.email && !customer.name) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{component}</>;
};

// Protected.propTypes = {
//   component: PropTypes.func.isRequired,
//   onlyUnAuth: PropTypes.bool.isRequired,
// };

export const OnlyAuth: React.FC<{ component: React.ReactNode }> = ({
  component,
}) => <Protected component={component} />;

export const OnlyUnAuth: React.FC<{ component: React.ReactNode }> = ({
  component,
}) => <Protected onlyUnAuth={true} component={component} />;
