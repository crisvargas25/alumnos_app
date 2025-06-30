import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    enrollmentYear: "", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaRef.current) {
      alert("El reCAPTCHA no esta");
      return;
    }

    if (form.password !== form.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const captchaToken = recaptchaRef.current.getValue();
    if (!captchaToken) {
      alert("Por favor completa el recuadro");
      return;
    }

    recaptchaRef.current.reset();

    try {
      const res = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          enrollmentYear: form.enrollmentYear, 
          captchaToken,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Registro exitoso");
        navigate("/");
      } else {
        alert(data.message || "Error al registrar cuenta");
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      alert("Error al registrar cuenta");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: "100%" }}>
        <h3 className="mb-4 mt-4 text-center">Crear Cuenta</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Año de inscripción</label>
            <input
              type="number"
              name="enrollmentYear"
              value={form.enrollmentYear}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
            size="normal"
            ref={recaptchaRef}
          />

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Crear Cuenta
          </button>
        </form>

        <hr className="my-4" />

        <div className="d-flex justify-content-center mb-3">
          <GoogleLogin
            onSuccess={async (response) => {
              const token = response?.credential;
              if (!token) return alert("Token de Google no recibido");

              try {
                const res = await fetch("http://localhost:3001/api/auth/google-login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token }),
                });

                const data = await res.json();
                if (res.ok) {
                  localStorage.setItem("token", data.token);
                  alert("Registro con Google exitoso");
                  navigate("/");
                } else {
                  alert(data.message || "Error al registrar con Google");
                }
              } catch (err) {
                console.error(err);
                alert("Error al registrar con Google");
              }
            }}
            onError={() => alert("Fallo el registro con Google")}
          />
        </div>

        <div className="text-center mt-2">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="btn btn-link p-0">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
