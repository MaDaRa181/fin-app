import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { APP_NAME, FOOTER_COPYRIGHT } from "../../constants";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import axios from "axios";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_BASE_URL = "http://localhost:8000/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Будь ласка, заповніть усі поля.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Паролі не співпадають.");
      return;
    }
    if (password.length < 6) {
      setError("Пароль повинен містити щонайменше 6 символів.");
      return;
    }

    try {
      const userData = { username, email, password };
      const response = await axios.post(`${API_BASE_URL}/register/`, userData);

      if (response.status === 201) {
        await login({ username, password });
        navigate("/dashboard");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Помилка реєстрації. Спробуйте пізніше."
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
          Реєстрація нового користувача
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="username"
            type="text"
            placeholder="Ім'я користувача"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Ім'я користувача"
          />
          <Input
            id="email"
            type="email"
            placeholder="Електронна пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Електронна пошта"
          />
          <Input
            id="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Пароль"
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Підтвердіть пароль"
          />
          {error && <p className="text-sm text-danger text-center">{error}</p>}
          <Button type="submit" fullWidth className="mt-2">
            Зареєструватися
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-text-muted">Вже є акаунт? </span>
          <Link
            to="/login"
            className="font-medium text-primary hover:text-accent"
          >
            Увійти
          </Link>
        </div>
      </div>
      <footer className="text-center py-8 text-text-muted text-xs w-full mt-auto">
        {FOOTER_COPYRIGHT}
      </footer>
    </div>
  );
};

export default RegisterPage;
