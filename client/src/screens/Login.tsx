import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginComponent from "../components/login-component.tsx";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (credentials: { email: string; password: string; captchaToken: string }) => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Inicio de sesión exitoso");
        navigate("/");
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      alert("Error al iniciar sesión");
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    const token = credentialResponse?.credential;
    if (!token) {
      alert("Token de Google no recibido");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login con Google exitoso");
        navigate("/");
      } else {
        alert(data.message || "Error al iniciar con Google");
      }
    } catch (err) {
      console.error("Error al autenticar con Google:", err);
      alert("Error al autenticar con Google");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="p-4 shadow rounded bg-white" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-circle" style={{ fontSize: "3rem", color: "#0d6efd" }}></i>
          <h2 className="mt-2">Iniciar Sesión</h2>
        </div>

        <LoginComponent
          onLogin={handleLogin}
          onGoogleLogin={() => handleGoogleLogin(undefined)}
        />

        <hr className="my-4" />

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Fallo el inicio con Google")}
        />

        <div className="text-center mt-3">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="btn btn-link p-0">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
