import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function ContenidoA(){
    return(
        <div className="mt-3">
            <Link to="/alumnos/agregar" className="btn vtn-primary">
                <Button variant="primary">Agregar</Button>
            </Link>&nbsp;
            <Link to="/alumnos/consultar" className="btn vtn-primary">
                <Button variant="secondary">Consultar</Button>
            </Link>&nbsp;
            <Link className="success" to={`/alumnos/Modificar`}>
                <Button variant="success" className="btn vtn-primary">
                    Modificar
                </Button>
            </Link>&nbsp;
            <Link className="warning" to={`/alumnos/Eliminar`}>
                <Button variant="warning" className="btn vtn-primary">
                    Eliminar
                </Button>
            </Link>&nbsp;
        </div>

    )
}

export default ContenidoA;