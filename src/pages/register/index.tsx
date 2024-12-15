import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../lib/axios";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("client");

  async function sendCredentials(e: any) {
    e.preventDefault();

    if (!userName || !userEmail || !userPassword || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (userPassword !== confirmPassword) {
      toast.warn("As senhas não conferem.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const userData = {
      name: userName,
      email: userEmail,
      password: userPassword,
      role: userRole,
    };

    var response = await api.post("/auth/register", userData);

    if (response.status === 201) {
      await toast.success("Cadastro realizado com sucesso.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      await toast.success("Redirecionando para o login.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000)
    }
  }

  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sistema de Reserva de Mesas</h1>
            </div>
            <form onSubmit={sendCredentials} className="space-y-4 md:space-y-6" action="#">
              <Input type="text" name="name" placeholder="Nome" Icon={User} onChange={(event) => setUserName(event.target.value)} />
              <Input type="email" name="email" placeholder="Email" Icon={Mail} onChange={(event) => setUserEmail(event.target.value)} />
              <Input type="password" name="password" placeholder="Senha" Icon={Lock} onChange={(event) => setUserPassword(event.target.value)} />
              <Input type="password" name="password" placeholder="Confirme sua Senha" Icon={Lock} onChange={(event) => setConfirmPassword(event.target.value)} />

              <h1 className="block mb-2 text-md font-bold text-gray-900 dark:text-white">Cargo</h1>
              <div className="flex gap-5">
                <div className="flex items-center">
                  <input defaultChecked onChange={() => setUserRole("client")} id="role-client" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="role-client" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Cliente
                  </label>
                </div>
                <div className="flex items-center">
                  <input onChange={() => setUserRole("admin")} id="role-admin" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="role-admin" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Administrador
                  </label>
                </div>
              </div>

              <Button type="submit" size="full">
                Cadastrar-se
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ja tem uma conta?{" "}
                <a onClick={() => navigate("/login")} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
