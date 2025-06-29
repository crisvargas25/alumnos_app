import { Navigate } from "react-router-dom";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props): JSX.Element {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}
