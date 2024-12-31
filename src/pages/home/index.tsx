import { Header } from "../../components/header";
import { MdOutlineCancel, MdOutlineTableBar, MdSearch } from "react-icons/md";
import { Card } from "../../components/card";
import { TbEdit, TbTrash } from "react-icons/tb";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import ListReservations from "../reservations/list-reservations-modal";
import CreateReservation from "../reservations/create-reservation-modal";
import CancelReservation from "../reservations/cancel-reservation-modal";
import CreateTable from "../tables/create-table-modal";
import DeleteTable from "../tables/delete-table-modal";
import EditTable from "../tables/edit-table-modal";

export default function Home() {
  const [isListReservationsModalOpen, setIsListReservationsModalOpen] = useState(false);
  const [isCreateReservationsModalOpen, setIsCreateReservationsModalOpen] = useState(false);
  const [isCancelReservationsModalOpen, setIsCancelReservationsModalOpen] = useState(false);
  const [isAddTablesModalOpen, setIsAddTablesModalOpen] = useState(false);
  const [isEditTablesModalOpen, setIsEditTablesModalOpen] = useState(false);
  const [isDeleteTablesModalOpen, setIsDeleteTablesModalOpen] = useState(false);
  const { isAdmin } = useAuth();

  function openListReservationsModal() {
    setIsListReservationsModalOpen(true);
  }

  function closeListReservationsModal() {
    setIsListReservationsModalOpen(false);
  }

  function openCreateReservationsModal() {
    setIsCreateReservationsModalOpen(true);
  }

  function closeCreateReservationsModal() {
    setIsCreateReservationsModalOpen(false);
  }

  function openCancelReservationsModal() {
    setIsCancelReservationsModalOpen(true);
  }

  function closeCancelReservationsModal() {
    setIsCancelReservationsModalOpen(false);
  }

  function openAddTablesModal() {
    setIsAddTablesModalOpen(true);
  }

  function closeAddTablesModal() {
    setIsAddTablesModalOpen(false);
  }

  function openEditTablesModal() {
    setIsEditTablesModalOpen(true);
  }

  function closeEditTablesModal() {
    setIsEditTablesModalOpen(false);
  }

  function openDeleteTablesModal() {
    setIsDeleteTablesModalOpen(true);
  }

  function closeDeleteTablesModal() {
    setIsDeleteTablesModalOpen(false);
  }

  return (
    <div>
      <Header />
      <div className="w-full h-[calc(100vh-53px)] flex flex-col items-center justify-center gap-10">
        <div className="text-center border py-6 px-20 bg-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-xl pb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Reservas</h1>
          <div className="flex justify-center flex-row gap-10">
            <Card onClick={openCreateReservationsModal} Icon={MdOutlineTableBar} title="Reservar" subtitle="Faça a reserva da sua mesa aqui." />
            <Card onClick={openListReservationsModal} Icon={MdSearch} title="Consultar" subtitle="Consulte suas reservas agendadas." />
            <Card onClick={openCancelReservationsModal} Icon={MdOutlineCancel} title="Cancelar" subtitle="Cancele sua reserva." />
          </div>
        </div>

        {isAdmin ? (
          <div className="text-center border py-6 px-20 bg-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-xl pb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Gestão de Mesas</h1>
            <div className="flex justify-center flex-row gap-10">
              <Card onClick={openAddTablesModal} Icon={PlusCircle} title="Adicionar" subtitle="Adicione mesas ao seu restaurante." />
              <Card onClick={openEditTablesModal} Icon={TbEdit} title="Editar" subtitle="Edite os atributos das mesas." />
              <Card onClick={openDeleteTablesModal} Icon={TbTrash} title="Excluir" subtitle="Exclua ou inative as mesas." />
            </div>
          </div>
        ) : null}
      </div>

      {isCreateReservationsModalOpen && <CreateReservation closeCreateReservationModal={closeCreateReservationsModal} />}
      {isListReservationsModalOpen && <ListReservations closeListReservationsModal={closeListReservationsModal} />}
      {isCancelReservationsModalOpen && <CancelReservation closeCancelReservationsModal={closeCancelReservationsModal} />}

      {isAddTablesModalOpen && <CreateTable closeCreateTablesModal={closeAddTablesModal} />}
      {isEditTablesModalOpen && <EditTable closeEditTablesModal={closeEditTablesModal} />}
      {isDeleteTablesModalOpen && <DeleteTable closeDeleteTablesModal={closeDeleteTablesModal} />}
    </div>
  );
}
