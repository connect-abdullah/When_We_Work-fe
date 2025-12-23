import React from "react";
import FormDropdownSelect, { DropdownOption } from "./FormDropdownSelect";

export type JobType = "contract" | "full_time" | "part_time" | "freelance";

interface JobTypeSelectProps {
  value?: JobType | "";
  onChange: (value: JobType | "") => void;
  label?: string;
  required?: boolean;
  className?: string;
}

const JOB_TYPE_OPTIONS: DropdownOption[] = [
  { value: "contract", label: "Contract" },
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "freelance", label: "Freelance" },
];

const JobTypeSelect: React.FC<JobTypeSelectProps> = ({
  value = "",
  onChange,
  label = "Job Category",
  required = false,
  className,
}) => {
  return (
    <FormDropdownSelect
      label={label}
      value={value}
      onChange={(val) => onChange(val as JobType | "")}
      options={JOB_TYPE_OPTIONS}
      required={required}
      className={className}
    />
  );
};

export default JobTypeSelect;

