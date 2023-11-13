import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface InputGroupPropsInput
  extends React.ComponentPropsWithoutRef<'input'> {}
interface InputGroupPropsTextArea
  extends React.ComponentPropsWithoutRef<'textarea'> {}

type InputProps = InputGroupPropsInput &
  InputGroupPropsTextArea & {
    inputName: string;
    textarea?: boolean;
    customClasses?: string;
    setValue: Dispatch<SetStateAction<string>>;
  };

export function Input({
  value,
  type,
  inputName,
  setValue,
  textarea = false,
  customClasses,
  ...props
}: InputProps) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <label
        className="text-s text-apptextprimary font-regular"
        htmlFor={inputName}
      >
        {inputName}
      </label>
      {!textarea ? (
        <input
          id={inputName}
          onChange={handleChange}
          value={value}
          type={type}
          className={`text-s bg-white border border-appborder text-apptsecondary rounded-md h-11 px-4 ${customClasses}`}
          {...props}
        ></input>
      ) : (
        <textarea
          id={inputName}
          onChange={handleChange}
          value={value}
          className="text-s bg-white border border-appborder text-apptsecondary rounded-md py-2 px-4"
          rows={2}
          {...props}
        ></textarea>
      )}
    </div>
  );
}
