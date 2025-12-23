import React from "react";
import FormSelect from "@/components/ui/FormSelect";

export interface DropdownOption {
  value: string;
  label: string;
}

interface FormDropdownSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const FormDropdownSelect: React.FC<FormDropdownSelectProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  required = false,
  className,
}) => {
  return (
    <FormSelect
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      required={required}
      className={className}
    />
  );
};

export default FormDropdownSelect;

