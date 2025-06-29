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
  aPaterno?: string;
  aMaterno?: string;
  sexo: number;
  aCorreo?: string;
  aTelefono?: string;
  nombreContacto?: string;
  telefonoContacto?: string;
  tiposangre?: string;
  // …otros campos
}

function AlumnosConsultar() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<Alumno | null>(null);

  // **Estados de búsqueda y filtros**
  const [buscar, setBuscar] = useState("");
  const [filtroSexo, setFiltroSexo] = useState<"" | "1" | "0">("");
  const [filtroSangre, setFiltroSangre] = useState<string>("");

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/alumnos");
      setAlumnos(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const alumnoConsultar = async (matricula: string) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/alumnos/${matricula}`);
      const alumno = data.result || data.results?.[0];
      if (alumno) {
        setAlumnoSeleccionado(alumno);
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // **Filtrado y búsqueda en memoria (useMemo para rendimiento)**
  const alumnosFiltrados = useMemo(() => {
    return alumnos
      .filter((a) => {
        // filtro por texto en matrícula o nombre (case-insensitive)
        const texto = buscar.toLowerCase();
        if (texto) {
          const hayEnMat = a.matricula.toLowerCase().includes(texto);
          const hayEnNom = a.nombre.toLowerCase().includes(texto);
          if (!hayEnMat && !hayEnNom) return false;
        }
        // filtro por sexo
        if (filtroSexo !== "" && String(a.sexo) !== filtroSexo) {
          return false;
        }
        // filtro por tipo de sangre
        if (filtroSangre && a.tiposangre !== filtroSangre) {
          return false;
        }
        return true;
      })
      .slice(0, 200); // opcional: límite para no renderizar miles
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
          {/* ===== Controles de búsqueda y filtros ===== */}
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
                <option value="1">Femenino</option>
                <option value="0">Masculino</option>
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

          {/* ===== Tabla de resultados ===== */}
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
                      <td>{a.nombre}</td>
                      <td>{a.aCorreo}</td>
                      <td>{a.aTelefono}</td>
                      <td>{a.sexo === 1 ? "Femenino" : "Masculino"}</td>
                      <td>{a.tiposangre}</td>
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

      {/* ===== Modal de detalle ===== */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {alumnoSeleccionado && `Detalle: ${alumnoSeleccionado.matricula}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alumnoSeleccionado && (
            <Row>
              <Col md={6}>
                <p><strong>Nombre:</strong> {alumnoSeleccionado.nombre}</p>
                <p><strong>Apellido Paterno:</strong> {alumnoSeleccionado.aPaterno}</p>
                <p><strong>Apellido Materno:</strong> {alumnoSeleccionado.aMaterno}</p>
                <p><strong>Correo:</strong> {alumnoSeleccionado.aCorreo}</p>
                <p><strong>Teléfono:</strong> {alumnoSeleccionado.aTelefono}</p>
              </Col>
              <Col md={6}>
                <p><strong>Sexo:</strong> {alumnoSeleccionado.sexo === 1 ? "Femenino" : "Masculino"}</p>
                <p><strong>Tipo de Sangre:</strong> {alumnoSeleccionado.tiposangre}</p>
                <p><strong>Contacto:</strong> {alumnoSeleccionado.nombreContacto}</p>
                <p><strong>Teléfono Contacto:</strong> {alumnoSeleccionado.telefonoContacto}</p>
                {/* Agrega aquí más campos si los necesitas */}
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
