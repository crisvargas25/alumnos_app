import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginComponent from "../components/login-component.tsx"

export default function Login() {
  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log("Login credentials:", credentials);
    // Aquí irá la lógica del backend
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
    // Aquí irá la lógica de OAuth
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

        <LoginComponent onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />

        <hr className="my-4" />

        <button
          className="btn btn-outline-danger w-100"
          onClick={handleGoogleLogin}
        >
          <i className="bi bi-google me-2"></i> Iniciar con Google
        </button>
      </div>
    </div>
  );
}
