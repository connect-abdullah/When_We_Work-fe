import React from "react";
import FormDropdownSelect, { DropdownOption } from "./FormDropdownSelect";

export type JobStatus = "active" | "inactive" | "completed" | "cancelled";

interface JobStatusSelectProps {
  value?: JobStatus | "";
  onChange: (value: JobStatus | "") => void;
  label?: string;
  required?: boolean;
  className?: string;
}

const JOB_STATUS_OPTIONS: DropdownOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const JobStatusSelect: React.FC<JobStatusSelectProps> = ({
  value = "",
  onChange,
  label = "Status",
  required = false,
  className,
}) => {
  return (
    <FormDropdownSelect
      label={label}
      value={value}
      onChange={(val) => onChange(val as JobStatus | "")}
      options={JOB_STATUS_OPTIONS}
      required={required}
      className={className}
    />
  );
};

export default JobStatusSelect;

