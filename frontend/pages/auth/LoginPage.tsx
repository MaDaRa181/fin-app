import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { APP_NAME, FOOTER_COPYRIGHT } from "../../constants";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Будь ласка, заповніть усі поля.");
      return;
    }

    try {
      await login({ username, password });
      navigate("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
          "Неправильне ім'я користувача або пароль."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-4">
      <div className="bg-bg-card shadow-xl rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          {APP_NAME}
        </h1>
        <h2 className="text-xl font-semibold text-text-main text-center mb-6">
          Вхід до облікового запису
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="username"
            type="text"
            placeholder="Ім'я користувача"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Ім'я користувача"
          />
          <Input
            id="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Пароль"
          />
          {error && <p className="text-sm text-danger text-center">{error}</p>}
          <Button type="submit" fullWidth>
            Увійти
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link to="#" className="font-medium text-primary hover:text-accent">
            Забули пароль?
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          <span className="text-text-muted">Немає акаунту? </span>
          <Link
            to="/register"
            className="font-medium text-primary hover:text-accent"
          >
            Зареєструватися
          </Link>
        </div>
      </div>
      <footer className="text-center py-8 text-text-muted text-xs w-full mt-auto">
        {FOOTER_COPYRIGHT}
      </footer>
    </div>
  );
};

export default LoginPage;
