import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { User, X } from "lucide-react";
import { Button } from "../../components/button";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { statusMap, TableProps } from "../../models/table-models";
import { Input } from "../../components/input";
import { MdNumbers } from "react-icons/md";
import axios from "axios";

interface EditTablesProps {
  closeEditTablesModal: () => void;
}

export default function EditTable({ closeEditTablesModal }: EditTablesProps) {
  const [tables, setTables] = useState<TableProps[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [tableId, setTableId] = useState(0);
  const [tableNumber, setTableNumber] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [status, setStatus] = useState("");

  function handleStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(event.target.value);
  }

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/tables");
      setTables(data.tables);
    })();
  }, [reload]);

  const getTableData = async (tableId: number) => {
    const { data } = await api.get(`/tables/${tableId}`);

    const table = data.table as TableProps;

    setTableId(table.id);
    setTableNumber(table.tableNumber);
    setCapacity(table.capacity);
    setStatus(table.status);

    setIsFormModalOpen(true);
  };

  const editTable = async (e: any) => {
    e?.preventDefault();

    const tableData = {
      tableNumber,
      capacity,
      status,
    };

    try {
      var response = await api.patch("/tables/" + tableId, tableData);

      if (response.status === 200) {
        await toast.success("Mesa editada com sucesso.", {
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
      setReload((prev) => !prev);
      setIsFormModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[800px] max-h-[800px] overflow-y-scroll rounded-xl py-5 px-6 shadow-shape bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Editar Mesas</h2>

            <button type="button" onClick={closeEditTablesModal}>
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
                  Capacidade
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={table.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{table.tableNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{table.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{statusMap[table.status] || "Desconhecido"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p onClick={() => getTableData(table.id)} className="cursor-pointer text-blue-500 text-sm">
                      Editar
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Edição de Mesa</h2>

                <button type="button" onClick={() => setIsFormModalOpen(false)}>
                  <X className="size-5 dark:text-white" />
                </button>
              </div>

              <form onSubmit={editTable} className="space-y-4 md:space-y-6" action="#">
                <Input type="number" name="tableNumber" placeholder="Nº da Mesa" value={tableNumber} Icon={MdNumbers} onChange={(event) => setTableNumber(Number(event.target.value))} />
                <Input type="number" name="capacity" placeholder="Capacidade" value={capacity} Icon={User} onChange={(event) => setCapacity(Number(event.target.value))} />

                <select id="status" value={status} className="bg-gray-50 border-gray-300 text-zinc-400 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleStatus}>
                  {/* <option value="0">Status</option> */}
                  <option value="available">Ativa</option>
                  <option value="reserved">Reservada</option>
                  <option value="inactive">Inativa</option>
                </select>

                <Button type="submit" size="full">
                  Editar Mesa
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
