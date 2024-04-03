import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactNode } from "react";
import { ICustomerState, IProtected, ProtectedProps } from "../../services/types";
import { useAppSelector } from "../../services/hooks/hooks";

const Protected: FC<ProtectedProps> = ({ onlyUnAuth = false, component }) => {

  const customer = useAppSelector(store => store.customer);
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

export const OnlyAuth: React.FC<{ component: React.ReactNode }> = ({
  component,
}) => <Protected component={component} />;

export const OnlyUnAuth: React.FC<{ component: React.ReactNode }> = ({
  component,
}) => <Protected onlyUnAuth={true} component={component} />;
