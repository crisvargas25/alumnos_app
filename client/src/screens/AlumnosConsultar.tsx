import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap";

interface Alumno {
  matricula: string;
  nombre: string;
  APaterno?: string;
  MPaterno?: string;
  sexo: string; // "1" o "0"
  CorreoElectrnico?: string;
  Telefono?: string;
  dNombreContacto?: string;
  TelefonoContacto?: string;
  TipoSangre?: string;
}

function AlumnosConsultar() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<Alumno | null>(null);

  const [buscar, setBuscar] = useState("");
  const [filtroSexo, setFiltroSexo] = useState<"" | "1" | "0">("");
  const [filtroSangre, setFiltroSangre] = useState<string>("");

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/alumnos/obtener");
      console.log(data.result);
      setAlumnos(Array.isArray(data.result) ? data.result : []);
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const alumnoConsultar = async (matricula: string) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/alumnos/getStudent/${matricula}`);
      const alumno = data.data;
      if (alumno) {
        setAlumnoSeleccionado(alumno);
        setShowModal(true);
      } else {
        console.warn("Alumno no encontrado");
      }
    } catch (err) {
      console.error("Error al consultar el alumno:", err);
    }
  };

  const alumnosFiltrados = useMemo(() => {
    return alumnos
      .filter((a) => {
        const texto = buscar.toLowerCase();
        if (texto) {
          const hayEnMat = a.matricula.toLowerCase().includes(texto);
          const hayEnNom = a.nombre.toLowerCase().includes(texto);
          if (!hayEnMat && !hayEnNom) return false;
        }

        if (filtroSexo !== "" && a.sexo !== filtroSexo) return false;

        if (filtroSangre && a.TipoSangre !== filtroSangre) return false;

        return true;
      })
      .slice(0, 200);
  }, [alumnos, buscar, filtroSexo, filtroSangre]);

  const handleCloseModal = () => {
    setShowModal(false);
    setAlumnoSeleccionado(null);
  };

  return (
    <div>
      <h1>Consultar Alumnos</h1>

      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Row className="mb-3 g-2">
            <Col md={6}>
              <InputGroup>
                <FormControl
                  placeholder="Buscar por matrícula o nombre…"
                  value={buscar}
                  onChange={(e) => setBuscar(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={() => setBuscar("")}>
                  ✕
                </Button>
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filtroSexo}
                onChange={(e) => setFiltroSexo(e.target.value as "" | "1" | "0")}
              >
                <option value="">Todos los sexos</option>
                <option value="1">Masculino</option>
                <option value="0">Femenino</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filtroSangre}
                onChange={(e) => setFiltroSangre(e.target.value)}
              >
                <option value="">Cualquier sangre</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Form.Select>
            </Col>
          </Row>

          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Matrícula</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Sexo</th>
                  <th>Sangre</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {alumnosFiltrados.length > 0 ? (
                  alumnosFiltrados.map((a, i) => (
                    <tr key={a.matricula}>
                      <td>{i + 1}</td>
                      <td>{a.matricula}</td>
                      <td>{`${a.nombre} ${a.APaterno || ""} ${a.MPaterno || ""}`}</td>
                      <td>{a.CorreoElectrnico}</td>
                      <td>{a.Telefono}</td>
                      <td>{a.sexo === "1" ? "Masculino" : "Femenino"}</td>
                      <td>{a.TipoSangre}</td>
                      <td>
                        <Button variant="primary" onClick={() => alumnoConsultar(a.matricula)}>
                          Consultar
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No hay resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {alumnoSeleccionado && `Matricula: ${alumnoSeleccionado.matricula}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alumnoSeleccionado && (
            <Row>
              <Col md={6}>
                <p><strong>Nombre:</strong> {alumnoSeleccionado.nombre}</p>
                <p><strong>Apellido Paterno:</strong> {alumnoSeleccionado.APaterno}</p>
                <p><strong>Apellido Materno:</strong> {alumnoSeleccionado.MPaterno}</p>
                <p><strong>Correo:</strong> {alumnoSeleccionado.CorreoElectrnico}</p>
                <p><strong>Teléfono:</strong> {alumnoSeleccionado.Telefono}</p>
              </Col>
              <Col md={6}>
                <p><strong>Sexo:</strong> {alumnoSeleccionado.sexo === "1" ? "Masculino" : "Femenino"}</p>
                <p><strong>Tipo de Sangre:</strong> {alumnoSeleccionado.TipoSangre}</p>
                <p><strong>Contacto:</strong> {alumnoSeleccionado.dNombreContacto}</p>
                <p><strong>Teléfono Contacto:</strong> {alumnoSeleccionado.TelefonoContacto}</p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AlumnosConsultar;
