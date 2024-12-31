import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { X } from "lucide-react";
import { Button } from "../../components/button";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { statusMap, TableProps } from "../../models/table-models";

interface DeleteTablesProps {
  closeDeleteTablesModal: () => void;
}

export default function DeleteTable({ closeDeleteTablesModal }: DeleteTablesProps) {
  const [tables, setTables] = useState<TableProps[]>([]);
  const [selectedTables, setSelectedTables] = useState<number[]>([]); // IDs das reservas selecionadas
  const [selectAll, setSelectAll] = useState(false); // Estado do checkbox "Selecionar Tudo"

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/tables");
      setTables(data.tables);
    })();
  }, []);

  // Lidar com a seleção de uma reserva individual
  const toggleTableSelection = (tableId: number) => {
    setSelectedTables(
      (prevSelected) =>
        prevSelected.includes(tableId)
          ? prevSelected.filter((id) => id !== tableId) // Remove se já estiver selecionado
          : [...prevSelected, tableId] // Adiciona se não estiver selecionado
    );
  };

  // Lidar com a seleção de todas as reservas
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedTables([]); // Desmarca todas
    } else {
      setSelectedTables(tables.map((table) => table.id)); // Marca todas
    }
    setSelectAll(!selectAll);
  };

  // Atualiza o estado do checkbox "Selecionar Tudo" conforme o estado das seleções
  useEffect(() => {
    setSelectAll(selectedTables.length === tables.length && tables.length > 0);
  }, [selectedTables, tables]);

  // Cancela as reservas selecionadas
  const deleteSelectedTables = async () => {
    try {
      selectedTables.forEach(async (tableId) => {
        await api.delete(`/tables/${tableId}`);
      });

      await toast.success("Mesas Excluidas com sucesso.", {
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
        setSelectedTables([]);
        setSelectAll(false);
        closeDeleteTablesModal();
      }, 3000);
    } catch (error) {
      console.error("Error deleting Tables:", error);
    }
  };

  const inativeSelectedTables = async () => {
    try {
      selectedTables.forEach(async (tableId) => {
        await api.patch(`/tables/${tableId}`, { status: "inactive" });
      });

      await toast.success("Mesas Inativadas com sucesso.", {
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
        setSelectedTables([]);
        setSelectAll(false);
        closeDeleteTablesModal();
      }, 3000);
    } catch (error) {
      console.error("Error deleting Tables:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[800px] max-h-[800px] overflow-y-scroll rounded-xl py-5 px-6 shadow-shape bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Excluir/Inativar Mesas</h2>

            <button type="button" onClick={closeDeleteTablesModal}>
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
                  Capacidade
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={table.id}>
                  <td className="p-4 flex justify-center relative">
                    <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" checked={selectedTables.includes(table.id)} onChange={() => toggleTableSelection(table.id)} />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{table.tableNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{table.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{statusMap[table.status] || "Desconhecido"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedTables.length > 0 ? (
            <div className="w-full flex justify-end gap-2">
              <Button onClick={deleteSelectedTables}>Excluir {selectedTables.length > 1 ? "Mesas" : "Mesa"}</Button>
              <Button onClick={inativeSelectedTables}>Inativar {selectedTables.length > 1 ? "Mesas" : "Mesa"}</Button>
            </div>
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
