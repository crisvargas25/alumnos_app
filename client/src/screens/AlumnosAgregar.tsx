import { useState } from "react";
import { Col, Container, Row, FloatingLabel, Form, Button } from "react-bootstrap";
import React from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import 'sweetalert2/src/sweetalert2.scss';

type alumnosEstructura = {
    matricula: string;
    nombre: string;
    APaterno: string;
    MPaterno: string;
    sexo: string;
    Telefono: string;
    CorreoElectrnico: string;
    PerfilFacebook: string;
    Instagram: string;
    TipoSangre: string;
    Contraseña: string;
    dCalle: string;
    Numero: number | string;
    Colonia: string;
    CodigoPostal: number | string;
    dNombreContacto: string;
    TelefonoContacto: string;
}

const initialState:alumnosEstructura = {
    matricula: "",
    nombre: "",
    APaterno: "",
    MPaterno: "",
    sexo: "",
    Telefono: "",
    CorreoElectrnico: "",
    PerfilFacebook: "",
    Instagram: "",
    TipoSangre: "",
    Contraseña: "",
    dCalle: "",
    Numero: 0,
    Colonia: "",
    CodigoPostal: 0,
    dNombreContacto: "",
    TelefonoContacto: ""
}

function AlumnosAgregar() {
    const [alumono, setAlumno] = useState(initialState);
    const navigate = useNavigate();

    const { matricula, nombre, APaterno, MPaterno, sexo, Telefono, CorreoElectrnico, PerfilFacebook, Instagram, TipoSangre, Contraseña, dCalle, Numero, Colonia, CodigoPostal, dNombreContacto, TelefonoContacto } = alumono;

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addAlumno(alumono);
    }

    const addAlumno = async (datos:alumnosEstructura) => {
        console.log(datos);
        
        const response = await axios.post(
            "http://localhost:5000/alumnos/agregar", 
            datos
        ).then((response) => {
            notify(response.data.status);
        }
        );
        return response;
    }

    const notify = (num:number) => {
        if (num === 100) {
            Swal.fire({
                title: 'Upssss!',
                text: 'No se agregó el lumno',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: '¡Alumno agregado!',
                text: 'El alumno se ha agregado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            navigate('/alumnos'); // Redirect to the alumnos list
        }
    }


    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        setAlumno({...alumono, [name]: value });
    }

    const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>):void => {
        let { name, value } = event.target;
        setAlumno({...alumono, [name]: value });
    }

    const handleCancelar = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No se guardarán los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setAlumno(initialState); // Reset the form
                Swal.fire(
                    'Cancelado',
                    'Los cambios no se guardaron.',
                    'error'
                );
            }
        });
    }

    return (
        <Container fluid>
            <Form onSubmit={ handleSubmit }>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="Matricula" className="mb-3">
                            <Form.Control type="text" placeholder="matricula" onChange={ handleInputChange } value={ matricula } name="matricula" />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Nombre" className="mb-3">
                            <Form.Control type="text" placeholder="Ingresa tu nombre" onChange={ handleInputChange } name="nombre" value={ nombre } required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="Apellido Paterno" className="mb-3">
                            <Form.Control type="text" placeholder="Apellido Paterno" onChange={ handleInputChange } value={ APaterno } name="APaterno" required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Apellido Materno" className="mb-3">
                            <Form.Control type="text" placeholder="Apellido Materno" onChange={ handleInputChange } value={ MPaterno} name="MPaterno" required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="Sexo" className="mb-3">
                            <Form.Select name="sexo" value={ sexo } onChange={ handleSelectChange } required>
                                <option value="">Selecciona una opción</option>
                                <option value="1">Masculino</option>
                                <option value="2">Femenino</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Telefono" className="mb-3" onChange={ handleInputChange }>
                            <Form.Control type="text" value={ Telefono }
                            placeholder="Telefono de ejemplo: (618) 166 7980" name="Telefono"
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="CorreoElectrnico" onChange={ handleInputChange } className="mb-3">
                            <Form.Control type="text" placeholder="Correo Electrnico" value={ CorreoElectrnico } name="CorreoElectrnico" required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="PerfilFacebook" onChange={ handleInputChange } className="mb-3">
                            <Form.Control type="text" value={ PerfilFacebook } placeholder="PerfilFacebook" name="PerfilFacebook" required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="Instagram" onChange={ handleInputChange } className="mb-3">
                            <Form.Control type="text" placeholder="Instagram" value={ Instagram } name="Instagram" required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="TipoSangre" onChange={ handleInputChange } className="mb-3">
                            <Form.Control type="text" placeholder="TipoSangre" name="TipoSangre" value={ TipoSangre } required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="Contraseña" onChange={ handleInputChange } className="mb-3">
                            <Form.Control type="password" placeholder="Contraseña" name="Contraseña" value={ Contraseña } required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>

                <Row className="mt-3 text-center">
                    <Col>
                        Dirección
                    </Col>
                </Row>

                <Row className="mt-3 mb-3">
                    <Col>
                        &nbsp;
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="Calle" className="mb-3">
                            <Form.Control type="text" placeholder="Calle" onChange={ handleInputChange } name="dCalle" value={ dCalle } required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Numero" className="mb-3">
                            <Form.Control type="number" placeholder="Numero" onChange={ handleInputChange } name="Numero" value={ Numero } required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="Colonia" className="mb-3">
                            <Form.Control type="text" placeholder="Colonia" onChange={ handleInputChange } value={ Colonia } name="Colonia" required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="CodigoPostal" className="mb-3">
                            <Form.Control type="number" placeholder="CodigoPostal" onChange={ handleInputChange } value={ CodigoPostal } name="CodigoPostal" required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>

                <Row className="mt-3 text-center">
                    <Col>
                    Contacto
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>{"\u00A0"}</Col>
                    <Col>
                        <FloatingLabel label="dNombreContacto" className="mb-3">
                            <Form.Control type="text" placeholder="dNombreContacto" onChange={ handleInputChange } value={ dNombreContacto } name="dNombreContacto" required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Telefono del contacto" className="mb-3">
                            <Form.Control type="text" value={ TelefonoContacto }
                            onChange={ handleInputChange }
                            placeholder="Telefono de ejemplo: (618) 166 7980" name="TelefonoContacto"
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>{"\u00A0"}</Col>
                </Row>
                
                <Row className="mt-3">
                    <Col>
                        &nbsp;
                    </Col>
                    <Col>
                        <Button type="submit" className="btn btn-primary">Guardar</Button>
                    </Col>
                    <Col>
                        <Button className="btn btn-info" onClick={ handleCancelar }>Cancelar</Button>
                    </Col>
                    <Col>
                        &nbsp;
                    </Col>
                </Row>
            </Form>

        </Container>
    );
}

export default AlumnosAgregar;
