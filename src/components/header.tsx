import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { handleLogout } = useAuth();

  return (
    <div className="w-full shadow flex justify-center items-center p-1 dark:border dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">🍽️ Sistema de Reserva de Mesas</h1>
      <button onClick={() => handleLogout()} className="absolute right-4 px-4 py-2 bg-primary-600 hover:bg-primary-700  focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-white rounded">
        Logout
      </button>
    </div>
  );
}
