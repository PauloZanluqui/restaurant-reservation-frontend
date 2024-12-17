import { LucideProps } from "lucide-react";
import { IconType } from "react-icons";

interface InputProps {
  Icon: IconType | React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  type: string,
  placeholder: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ Icon, type, placeholder, name, onChange }: InputProps) {
  return (
    <div className="h-14 px-4 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg flex items-center gap-2">
        <Icon className="size-5 text-zinc-400" />
        <input onChange={onChange} name={name} placeholder={placeholder} type={type} className="bg-transparent text-lg placeholder-zinc-400 dark:text-white outline-none flex-1" />
    </div>
  );
}