import { FormEvent, MouseEventHandler } from 'react';

type ButtonProps = {
  value: string;
  type: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick?: (event: any) => void;
};

export function Button({ value, type, variant, onClick }: ButtonProps) {
  return (
    <button
      className={`
        ${variant === 'primary' && 'bg-appprimary'}
        ${variant === 'secondary' && 'bg-apptsecondary'}
        ${variant === 'danger' && 'bg-appdanger'}
       text-white h-11 w-full rounded-md max-w-[312px]
        hover:shadow-lg
      `}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
