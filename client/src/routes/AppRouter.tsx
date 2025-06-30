    import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
    

    import Login from "../screens/Login.tsx";
    import Menu from "../screens/Menu.tsx";
    import AlumnosAgregar from "../screens/AlumnosAgregar.tsx";
    import AlumnosConsultar from "../screens/AlumnosConsultar.tsx"
    import AlumnoModificar from "../screens/AlumnoModificar.tsx";
    import AlumnoEliminar from "../screens/AlumnoEliminar.tsx";
    import NotFound from "../screens/NotFound.tsx";
    import PrivateRoute from "./PrivateRoute.tsx";
    import Error505 from "../screens/505error.tsx";
    import ContenidoA from "../screens/ContenidoA.tsx";

    export default function AppRouter() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
            path="/"
            element={
                <PrivateRoute>
                <Menu />
                </PrivateRoute>
            }
            >
            <Route path="alumnos" element={<ContenidoA />} />
            <Route path="alumnos/agregar" element={<AlumnosAgregar />} />
            <Route path="alumnos/consultar" element={<AlumnosConsultar />} />
            <Route path="alumnos/modificar" element={<AlumnoModificar />} />
            <Route path="alumnos/eliminar" element={<AlumnoEliminar />} />
            </Route>
            <Route path="/505" element={<Error505 />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
    );
    }
