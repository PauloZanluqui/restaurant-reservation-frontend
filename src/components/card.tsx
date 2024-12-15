import { LucideProps } from "lucide-react";
import { IconType } from "react-icons";

interface CardProps {
  Icon: IconType | React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  subtitle: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Card({ Icon, title, subtitle, onClick }: CardProps) {
  return (
    <div onClick={onClick} className="flex items-center cursor-pointer max-w-60 min-h-52 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="w-full h-full flex flex-col items-center justify-center p-2">
        <Icon size={40} />
        <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="font-normal text-center text-gray-700 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
