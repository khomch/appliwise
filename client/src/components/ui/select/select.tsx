type TSelectOption = {
  id: string;
  value: string;
  text: string;
};

type SelectProps = {
  id: string;
  isDisabled: boolean;
  options: TSelectOption[];
  selectedStatus: string;
  handleSelectStatus: any;
};

export function Select({
  options,
  selectedStatus,
  id,
  handleSelectStatus,
  isDisabled,
}: SelectProps) {
  return (
    <select
      value={selectedStatus}
      id={id}
      className="text-s bg-white border border-appborder text-apptsecondary rounded-md h-11 px-4"
      onChange={handleSelectStatus}
      disabled={isDisabled}
    >
      {options &&
        options.map((option: Record<string, string>) => (
          <option key={option.id} value={option.value}>
            {option.text}
          </option>
        ))}
    </select>
  );
}
