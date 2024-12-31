import { useState } from "react";
import { api } from "../../lib/axios";
import { User, X } from "lucide-react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { MdNumbers } from "react-icons/md";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface CreateTableProps {
  closeCreateTablesModal: () => void;
}

export default function CreateTable({ closeCreateTablesModal }: CreateTableProps) {
  const [tableNumber, setTableNumber] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [status, setStatus] = useState("");

  function handleStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(event.target.value);
  }

  async function createTable(e: any) {
    e?.preventDefault();

    if (!capacity) {
      toast.error("Por favor, informe a quantidade de lugares da mesa.", {
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
    } else if (!tableNumber || tableNumber == 0) {
      toast.error("Por favor, informe o numero da mesa.", {
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

    const tableData = {
      tableNumber,
      capacity,
      status,
    };

    try {
      var response = await api.post("/tables", tableData);

      if (response.status === 201) {
        await toast.success("Mesa criada com sucesso.", {
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
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          await toast.error(error.response.data.error, {
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
        }
      }
    } finally {
      setTimeout(() => {
        closeCreateTablesModal();
      }, 3000);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastro de Mesa</h2>

            <button type="button" onClick={closeCreateTablesModal}>
              <X className="size-5 dark:text-white" />
            </button>
          </div>

          <form onSubmit={createTable} className="space-y-4 md:space-y-6" action="#">
            <Input type="number" name="tableNumber" placeholder="Nº da Mesa" Icon={MdNumbers} onChange={(event) => setTableNumber(Number(event.target.value))} />
            <Input type="number" name="capacity" placeholder="Capacidade" Icon={User} onChange={(event) => setCapacity(Number(event.target.value))} />

            <select id="status" className="bg-gray-50 border-gray-300 text-zinc-400 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleStatus}>
              <option defaultValue="0">Status</option>
              <option value="available">Ativa</option>
              <option value="reserved">Reservada</option>
              <option value="inactive">Inativa</option>
            </select>

            <Button type="submit" size="full">
              Criar Mesa
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
