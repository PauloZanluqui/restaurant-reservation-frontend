import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: 'focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center',

  variants: {
    variant: {
      primary: 'text-white bg-primary-600 hover:bg-primary-700  focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
      // secundary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11'
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({children, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({variant, size})}>
      {children}
    </button>
  );
}