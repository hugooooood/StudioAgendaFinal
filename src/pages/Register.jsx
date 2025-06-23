import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import ilustracion from "../assets/signup-visual.jpg";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const data = { name, email, password };

    try {
      const res = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Usuario registrado correctamente');
        // Aquí podrías redirigir al login
      } else {
        alert(result.error || 'Error al registrar');
      }
    } catch (error) {
      console.error('Error al conectar:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <>
      
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <Card className="shadow-lg border-0 w-100" style={{ maxWidth: "1000px" }}>
          <Row className="g-0">
            {/* LADO IZQUIERDO */}
            <Col
              md={6}
              className="bg-dark text-white d-flex flex-column justify-content-center align-items-center p-4"
              style={{
                backgroundImage: `url(${ilustracion})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-dark bg-opacity-75 p-4 rounded">
                <h2 className="fw-bold mb-3">¿Nuevo en StudioAgenda?</h2>
                <p>
                  Agenda tus horas de grabación de forma rápida, visualiza estudios disponibles en tu zona
                  y conecta con productores de forma directa.
                </p>
                <p className="small text-muted">
                  Regístrate para comenzar a usar nuestro sistema de agendamiento inteligente.
                </p>
              </div>
            </Col>

            {/* LADO DERECHO - FORMULARIO */}
            <Col md={6} className="p-5">
              <h3 className="mb-4 text-center fw-bold">Crear una cuenta</h3>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-4">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button variant="primary" size="lg" onClick={handleSubmit}>
                    Registrarse
                  </Button>
                </div>

                <div className="text-center">
                  <small>
                    ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
                  </small>
                </div>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Register;
