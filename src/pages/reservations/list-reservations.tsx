import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Header } from "../../components/header";
import { format } from "date-fns";

enum eReservationStatus {
  active = "active",
  canceled = "canceled",
}

interface ReservationProps {
  id: number;
  reservationDate: Date;
  peopleQuantity: number;
  status: eReservationStatus;
  table: {
    tableNumber: number;
  };
}

export default function ListReservations() {
  const [reservations, setReservations] = useState<ReservationProps[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/reservations");
      setReservations(data.reservations);
    })();
  }, []);

  return (
    <div>
      <Header />
      <div className="relative overflow-x-auto px-20 my-6">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{eReservationStatus[reservation.status]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
