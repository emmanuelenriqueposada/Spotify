import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { googleAuth, login, onAthStateChange } from "../../utils/auth";

export const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email.trim(), password.trim());

      onAthStateChange((user) => {
        if (user) {
          navigate("/");
        }
      });

      navigate("/");
    } catch {
      setError("Credenciales incorrectas o error al iniciar sesión.");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleAuth();
      navigate("/");
    } catch {
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <section className="flex-1 bg-gradient-to-b from-gray-800 to-black overflow-auto h-screen flex items-center justify-center backdrop-blur-md">
      <div className="flex flex-col justify-center px-6 py-12 w-full max-w-md bg-black/40 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            alt="Spotify App"
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            className="h-12 w-12"
          />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
            Iniciar Sesión
          </h2>
        </div>

        <div className="mt-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setError("")}
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setError("")}
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-indigo-600"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline focus:ring-2 focus:ring-indigo-600"
            >
              Iniciar Sesión
            </button>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 text-gray-800 hover:bg-gray-200 mt-2"
            >
              <FaGoogle />
              Iniciar con Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
