export interface TableProps {
  id: number;
  tableNumber: number;
  capacity: number;
  status: eTableStatus;
}

export enum eTableStatus {
  available = "available",
  reserved = "reserved",
  inactive = "inactive",
}

export const statusMap: Record<string, string> = {
  available: "Ativa",
  reserved: "Reservada",
  inactive: "Inativa"
};