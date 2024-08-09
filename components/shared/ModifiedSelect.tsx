import React, { memo } from "react";

interface SelectInputProps {
  options: string[] | undefined;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  required: boolean;
}

const ModifiedSelect: React.FC<SelectInputProps> = memo(
  ({ options, selectedValue, onChange, placeholder, required }) => {
    return (
      <select
        className="w-full h-12 border px-3 rounded-md bg-transparent border-kaiglo_grey-500 focus:border-kaiglo_brand-base ring-offset-background placeholder:font-medium placeholder:text-kaiglo_grey-placeholder focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        value={selectedValue}
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  },
);

export default ModifiedSelect;
