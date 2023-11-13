import { FormEvent, MouseEventHandler } from 'react';
interface ButtonPropsOriginal
  extends React.ComponentPropsWithoutRef<'button'> {}

type ButtonProps = ButtonPropsOriginal & {
  size?: 's' | 'm' | 'xl';
  style?: 'border' | 'fill';
  variant: 'primary' | 'secondary' | 'danger';
  customStyle?: string;
  dashed?: boolean;
};

export function Button({
  value,
  size = 'm',
  style = 'fill',
  variant,
  type,
  customStyle,
  dashed = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
     h-11 w-full rounded-md 
        ${
          style === 'fill' &&
          variant === 'primary' &&
          'bg-appprimary text-white'
        }
        ${
          style === 'fill' &&
          variant === 'secondary' &&
          'bg-apptsecondary text-white'
        }
        ${style === 'fill' && variant === 'danger' && 'bg-appdanger text-white'}
        ${size === 's' && 'w-[88px]'}
        ${size === 'm' && 'max-w-[312px]'}
        ${size === 'xl' && 'max-w-[800px]'}
        ${
          style === 'border' &&
          variant === 'primary' &&
          'bg-none border-appprimary text-appprimary border'
        }
        ${
          style === 'border' &&
          variant === 'secondary' &&
          ' bg-none border-apptsecondary border text-apptsecondary'
        }
        ${
          style === 'border' &&
          variant === 'danger' &&
          'bg-none border-appdanger border text-appdanger'
        }
        ${dashed && `border-0 outline-dashed  outline-appcardinactive`}
        hover:shadow-lg
        ${customStyle}
      `}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
