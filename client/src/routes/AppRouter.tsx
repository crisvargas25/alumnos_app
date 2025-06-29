    import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
    import Login from "../screens/Login.tsx";
    import Menu from "../screens/Menu.tsx";
    import AlumnosAgregar from "../screens/AlumnosAgregar.tsx";
    import AlumnosConsultar from "../screens/AlumnosConsultar.tsx"
    import AlumnoModificar from "../screens/AlumnoModificar.tsx";
    import AlumnoEliminar from "../screens/AlumnoEliminar.tsx";
    import NotFound from "../screens/NotFound.tsx";
    import PrivateRoute from "./PrivateRoute.tsx";

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
            <Route path="agregar" element={<AlumnosAgregar />} />
            <Route path="consultar" element={<AlumnosConsultar />} />
            <Route path="modificar/:id" element={<AlumnoModificar />} />
            <Route path="eliminar/:id" element={<AlumnoEliminar />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
    );
    }
