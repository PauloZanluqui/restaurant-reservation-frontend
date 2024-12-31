export interface ReservationProps {
  id: number;
  reservationDate: Date;
  peopleQuantity: number;
  status: eReservationStatus;
  table: {
    tableNumber: number;
  };
}

export enum eReservationStatus {
  active,
  canceled
}

export const statusMap: Record<string, string> = {
  active: "Ativa",
  canceled: "Cancelada",
};