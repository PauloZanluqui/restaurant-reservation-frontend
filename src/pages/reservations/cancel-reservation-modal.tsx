import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { X } from "lucide-react";
import { ReservationProps, statusMap } from "../../models/reservation-models";
import { Button } from "../../components/button";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface CancelReservationsProps {
  closeCancelReservationsModal: () => void;
}

export default function CancelReservation({ closeCancelReservationsModal }: CancelReservationsProps) {
  const [reservations, setReservations] = useState<ReservationProps[]>([]);
  const [selectedReservations, setSelectedReservations] = useState<number[]>([]); // IDs das reservas selecionadas
  const [selectAll, setSelectAll] = useState(false); // Estado do checkbox "Selecionar Tudo"

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/reservations?status=active");
      setReservations(data.reservations);
    })();
  }, []);

  // Lidar com a seleção de uma reserva individual
  const toggleReservationSelection = (reservationId: number) => {
    setSelectedReservations(
      (prevSelected) =>
        prevSelected.includes(reservationId)
          ? prevSelected.filter((id) => id !== reservationId) // Remove se já estiver selecionado
          : [...prevSelected, reservationId] // Adiciona se não estiver selecionado
    );
  };

  // Lidar com a seleção de todas as reservas
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedReservations([]); // Desmarca todas
    } else {
      setSelectedReservations(reservations.map((reservation) => reservation.id)); // Marca todas
    }
    setSelectAll(!selectAll);
  };

  // Atualiza o estado do checkbox "Selecionar Tudo" conforme o estado das seleções
  useEffect(() => {
    setSelectAll(selectedReservations.length === reservations.length && reservations.length > 0);
  }, [selectedReservations, reservations]);

  // Cancela as reservas selecionadas
  const cancelSelectedReservations = async () => {
    try {
      selectedReservations.forEach(async (reservationId) => {
        await api.patch(`/reservations/${reservationId}/cancel`);
      });

      await toast.success("Reserva cancelada com sucesso.", {
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
        setSelectedReservations([]);
        setSelectAll(false);
        closeCancelReservationsModal();
      }, 3000);
    } catch (error) {
      console.error("Error canceling reservations:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[800px] max-h-[800px] overflow-y-scroll rounded-xl py-5 px-6 shadow-shape bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cancelar Reservas</h2>

            <button type="button" onClick={closeCancelReservationsModal}>
              <X className="size-5 dark:text-white" />
            </button>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4 flex justify-center relative">
                  <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Nº da Mesa
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantidade de Pessoas
                </th>
                <th scope="col" className="px-6 py-3">
                  Data da Reserva
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={reservation.id}>
                  <td className="p-4 flex justify-center relative">
                    <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" checked={selectedReservations.includes(reservation.id)} onChange={() => toggleReservationSelection(reservation.id)} />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{reservation.table.tableNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{reservation.peopleQuantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{format(new Date(reservation.reservationDate), "dd/MM/yyyy HH:mm")}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{statusMap[reservation.status] || "Desconhecido"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedReservations.length > 0 ? (
            <div className="w-full flex justify-end">
              <Button onClick={cancelSelectedReservations}>Cancelar {selectedReservations.length > 1 ? "Reservas" : "Reserva"}</Button>
            </div>
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
