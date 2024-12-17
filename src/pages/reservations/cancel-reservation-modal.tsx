import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { X } from "lucide-react";

interface CancelReservationsProps {
  closeCancelReservationsModal: () => void;
}

export default function CancelReservation({ closeCancelReservationsModal }: CancelReservationsProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[800px] h-[800px] overflow-y-scroll rounded-xl py-5 px-6 shadow-shape bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cancelar Reservas</h2>

            <button type="button" onClick={closeCancelReservationsModal}>
              <X className="size-5 dark:text-white" />
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
