import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!user) return;

    if (!username || !email) {
      setError(
        "Ім'я користувача та електронна пошта не можуть бути порожніми."
      );
      return;
    }

    if (password && password !== confirmPassword) {
      setError("Паролі не співпадають.");
      return;
    }
    if (password && password.length < 6) {
      setError("Новий пароль повинен містити щонайменше 6 символів.");
      return;
    }

    const updatedUser = { ...user, username, email };
    login(updatedUser);

    console.log("Profile updated:", {
      username,
      email,
      password: password ? "********" : "не змінено",
    });
    setSuccessMessage("Профіль успішно оновлено!");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <p>Користувача не знайдено. Будь ласка, увійдіть.</p>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-6">
          <Card title="Швидкі дії" titleClassName="text-lg">
            <Button onClick={handleLogout} variant="danger" fullWidth>
              Вийти
            </Button>
          </Card>
        </aside>

        <main className="md:col-span-3 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-primary mb-6">
              Профіль користувача
            </h2>

            <div className="mb-8 space-y-2">
              <div className="flex">
                <span className="font-medium text-text-muted w-32">
                  Повне ім'я:
                </span>
                <span className="text-text-main">{user.username}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-text-muted w-32">Email:</span>
                <span className="text-text-main">{user.email}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-text-muted w-32">
                  Приєднався:
                </span>
                <span className="text-text-main">
                  {new Date(user.createdAt).toLocaleDateString("uk-UA")}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-primary mb-4">
              Оновити дані профілю
            </h3>
            {error && (
              <p className="mb-4 text-sm text-danger text-center p-2 bg-red-100 rounded">
                {error}
              </p>
            )}
            {successMessage && (
              <p className="mb-4 text-sm text-success text-center p-2 bg-green-100 rounded">
                {successMessage}
              </p>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Input
                id="profileUsername"
                type="text"
                label="Ім'я користувача"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                id="profileEmail"
                type="email"
                label="Електронна пошта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <hr className="my-6" />
              <h4 className="text-md font-semibold text-text-main">
                Змінити пароль (залиште порожнім, якщо не міняєте)
              </h4>
              <Input
                id="profilePassword"
                type="password"
                label="Новий пароль"
                placeholder="Новий пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                id="profileConfirmPassword"
                type="password"
                label="Підтвердіть новий пароль"
                placeholder="Підтвердіть новий пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="success"
                className="w-full sm:w-auto"
              >
                Зберегти зміни
              </Button>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
