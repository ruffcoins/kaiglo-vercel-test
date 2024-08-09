import { ModifiedTextAreaProps } from "@/interfaces/elements.interface";
import React from "react";

const ModifiedTextArea = ({
  value,
  onChange,
  placeholder,
  rows,
  required,
}: ModifiedTextAreaProps) => {
  return (
    <textarea
      className="w-full border p-3 rounded-md bg-transparent border-kaiglo_grey-500 focus:border-kaiglo_brand-base ring-offset-background placeholder:font-medium placeholder:text-kaiglo_grey-placeholder focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
    />
  );
};

export default ModifiedTextArea;
