import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  onLogin: (credentials: { email: string; password: string; captchaToken: string }) => void;
  onGoogleLogin: () => void;
}

export default function LoginComponent({ onLogin, onGoogleLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Por favor completa el reCAPTCHA");
      return;
    }
    onLogin({ email, password, captchaToken });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
        onChange={(token) => setCaptchaToken(token)}
        className="mb-3"
      />

      <button type="submit" className="btn btn-primary w-100">
        Iniciar sesión
      </button>
    </form>
  );
}
