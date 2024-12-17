import { useState } from "react";
import { api } from "../../lib/axios";
import { User, X, Calendar } from "lucide-react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { MdNumbers } from "react-icons/md";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface CreateReservationProps {
  closeCreateReservationModal: () => void;
}

export default function CreateReservation({ closeCreateReservationModal }: CreateReservationProps) {
  const [tableNumber, setTableNumber] = useState(0);
  const [peopleQuantity, setPeopleQuantity] = useState(0);
  const [reservationDate, setReservationDate] = useState("");

  async function createReservation(e: any) {
    e?.preventDefault();

    if (!peopleQuantity) {
      toast.error("Por favor, informe a quantidade de pessoas para a reserva.", {
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
    } else if (!reservationDate) {
      toast.error("Por favor, escolha uma data e hora para a reserva.", {
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

    const reservationData = {
      tableNumber,
      peopleQuantity,
      reservationDate,
    };

    try {
      var response = await api.post("/reservations", reservationData);

      if (response.status === 201) {
        await toast.success("Reserva criada com sucesso.", {
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
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastro de Reserva</h2>

            <button type="button" onClick={closeCreateReservationModal}>
              <X className="size-5 dark:text-white" />
            </button>
          </div>

          <form onSubmit={createReservation} className="space-y-4 md:space-y-6" action="#">
            <Input type="number" name="tableNumber" placeholder="Nº da Mesa" Icon={MdNumbers} onChange={(event) => setTableNumber(Number(event.target.value))} />
            <Input type="number" name="peopleQuantity" placeholder="Quantidade de Pessoas" Icon={User} onChange={(event) => setPeopleQuantity(Number(event.target.value))} />
            <Input type="datetime-local" name="reservationDate" placeholder="Data da Reserva" Icon={Calendar} onChange={(event) => setReservationDate(event.target.value)} />

            <Button type="submit" size="full">
              Criar Reserva
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
