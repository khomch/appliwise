import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type InputProps = {
  value: string;
  type: string;
  inputName: string;
  textarea?: boolean;
  setValue: Dispatch<SetStateAction<string>>;
};

export function Input({
  value,
  type,
  inputName,
  setValue,
  textarea = false,
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
          className="text-s bg-white border border-appborder text-apptsecondary rounded-md h-11 px-4"
        ></input>
      ) : (
        <textarea
          id={inputName}
          onChange={handleChange}
          value={value}
          className="text-s bg-white border border-appborder text-apptsecondary rounded-md py-2 px-4"
          rows={5}
        ></textarea>
      )}
    </div>
  );
}
