import React from "react";

interface TimeInputProps {
  label: string;
  name: string;
  type: string;
  ariaLabel: string;
  dataTestId?: string;
  value: string;
  additionalInfo?: string; // Additional information to be displayed on hover
  onChange: (value: string) => void;
}

const TimeInputField: React.FC<TimeInputProps> = ({
  label,
  name,
  type,
  ariaLabel,
  dataTestId,
  value,
  additionalInfo,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 p-2" title={additionalInfo}>
        {label}
        <input
          name={name}
          type={type}
          aria-label={ariaLabel}
          data-test-id={dataTestId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>
    </div>
  );
};

export default TimeInputField;
