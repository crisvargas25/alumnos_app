import { Navigate } from "react-router-dom";
import { JSX } from "react";


interface Props {
  children: JSX.Element;
}


// para probar las rutas priovadas sin necesidad de estar logewnadop
const dev_mode = false

export default function PrivateRoute({ children }: Props): JSX.Element {
  if (dev_mode) {
    return children;
  } else{
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  }
  
}
