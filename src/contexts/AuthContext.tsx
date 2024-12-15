import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import axios from "axios";

// Definição do tipo de contexto
interface AuthContextProps {
  isAdmin: boolean;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function AuthProvider({ children }: any) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    setLoading(false);
  }, []);

  // Função de login
  async function handleLogin(email: string, password: string) {
    try {
      const { data: { token, role } } = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;

      if (role === "admin") {
        setIsAdmin(true);
      }

      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Credenciais inválidas. Por favor, tente novamente.");
        } else {
          alert("Ocorreu um erro. Tente novamente mais tarde.");
        }
      } else {
        console.error("Erro inesperado:", error);
        alert("Erro inesperado ocorreu.");
      }
    }
  }

  // Função de logout
  function handleLogout() {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setIsAdmin(false);
    navigate("/login");
  }

  // Interceptador de resposta para lidar com erro 401
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleLogout(); // Chama logout em caso de erro 401
        }
        return Promise.reject(error);
      }
    );

    // Limpa o interceptador ao desmontar
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <AuthContext.Provider value={{ isAdmin, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
