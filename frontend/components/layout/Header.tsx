import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { APP_NAME, NAV_LINKS } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="text-2xl font-bold text-primary">{APP_NAME}</div>
        <nav className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-text-main hover:text-primary font-medium ${
                  isActive ? "text-primary border-b-2 border-primary" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-sm cursor-pointer"
            title="Профіль користувача"
            onClick={handleProfileClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleProfileClick()}
          >
            {user.initials || user.username.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
