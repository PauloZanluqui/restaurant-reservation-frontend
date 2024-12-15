import { Lock, Mail } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  function sendCredentials(e: any) {
    e.preventDefault();

    handleLogin(userEmail, userPassword);
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sistema de Reserva de Mesas</h1>
            </div>
            <form onSubmit={sendCredentials} className="space-y-4 md:space-y-6" action="#">
              <Input type="email" name="email" placeholder="Email" Icon={Mail} onChange={(event) => setUserEmail(event.target.value)} />
              <Input type="password" name="password" placeholder="Senha" Icon={Lock} onChange={(event) => setUserPassword(event.target.value)} />
              <Button type="submit" size="full">
                Login
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Não tem uma conta ainda?{" "}
                <a onClick={() => navigate("/register")} className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Cadastre-se
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
