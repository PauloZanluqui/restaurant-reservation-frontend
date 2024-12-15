import { useEffect } from "react";
import { api } from "../../lib/axios";
import { Header } from "../../components/header";
import { MdOutlineCancel, MdOutlineTableBar, MdSearch } from "react-icons/md";
import { Card } from "../../components/card";
import { TbEdit, TbTrash } from "react-icons/tb";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { isAdmin } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/tables");

      console.log(data);
    })();
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full h-[calc(100vh-53px)] flex flex-col items-center justify-center gap-10">
        <div className="text-center border py-6 px-20 bg-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-xl pb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Reservas</h1>
          <div className="flex justify-center flex-row gap-10">
            <Card onClick={() => console.log("clicou")} Icon={MdOutlineTableBar} title="Reservar" subtitle="Faça a reserva da sua mesa aqui." />
            <Card onClick={() => console.log("clicou")} Icon={MdSearch} title="Consultar" subtitle="Consulte suas reservas agendadas." />
            <Card onClick={() => console.log("clicou")} Icon={MdOutlineCancel} title="Cancelar" subtitle="Cancele sua reserva." />
          </div>
        </div>

        {isAdmin ? (
          <div className="text-center border py-6 px-20 bg-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-xl pb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Gestão de Mesas</h1>
            <div className="flex justify-center flex-row gap-10">
              <Card onClick={() => console.log("clicou")} Icon={PlusCircle} title="Adicionar" subtitle="Adicione mesas ao seu restaurante." />
              <Card onClick={() => console.log("clicou")} Icon={TbEdit} title="Editar" subtitle="Edite os atributos das mesas." />
              <Card onClick={() => console.log("clicou")} Icon={TbTrash} title="Excluir" subtitle="Exclua ou inative as mesas." />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
