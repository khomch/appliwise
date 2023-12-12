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
  disabled,
  customStyle,
  dashed = false,
  onClick,
  ...props
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
        ${size === 'm' && 'max-w-[312px]'}
        ${size === 's' && 'w-[88px]'}
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
        hover:shadow-lg
        ${dashed && `border-0 outline-dashed  outline-appcardinactive`}
        ${customStyle}
        ${disabled && 'bg-appcardinactive border text-apptsecondary hover:shadow-none cursor-default'}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {value}
    </button>
  );
}
