import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const RestuarantPrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token && auth.account_type === "restaurant" ? (
    <Route {...rest} />
  ) : (
    <Redirect to='/HP/RestaurantSignIn' />
  );
};
export const DelivererPrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token && auth.account_type === "deliverer" ? (
    <Route {...rest} />
  ) : (
    <Redirect to='/HP/DeliverySignIn' />
  );
};
export const UserPrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token && auth.account_type === "user" ? (
    <Route {...rest} />
  ) : (
    <Redirect to='/HP/CustomerSignIn' />
  );
};
