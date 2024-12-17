import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { X } from "lucide-react";

interface ListReservationsProps {
  closeListReservationsModal: () => void;
}

enum eReservationStatus {
  active,
  canceled
}

const statusMap: Record<string, string> = {
  active: "Ativa",
  canceled: "Cancelada",
};

interface ReservationProps {
  id: number;
  reservationDate: Date;
  peopleQuantity: number;
  status: eReservationStatus;
  table: {
    tableNumber: number;
  };
}

export default function ListReservations({ closeListReservationsModal }: ListReservationsProps) {
  const [reservations, setReservations] = useState<ReservationProps[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/reservations");
      setReservations(data.reservations);
    })();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[800px] max-h-[800px] overflow-y-scroll rounded-xl py-5 px-6 shadow-shape bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Listagens de Reservas</h2>

            <button type="button" onClick={closeListReservationsModal}>
              <X className="size-5 dark:text-white" />
            </button>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
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
              {reservations.map((reservation) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{reservation.table.tableNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{reservation.peopleQuantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{format(new Date(reservation.reservationDate), "dd/MM/yyyy HH:mm")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{statusMap[reservation.status] || "Desconhecido"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
