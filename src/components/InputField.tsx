import React from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  ariaLabel: string;
  min?: number;
  step?: number;
  dataTestId?: string;
  value: number;
  additionalInfo?: string; // Additional information to be displayed on hover
  onChange: (value: number) => void;
}

const InputField: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  ariaLabel,
  min,
  step,
  dataTestId,
  value,
  additionalInfo,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 p-2 " title={additionalInfo}>
        {label}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          aria-label={ariaLabel}
          min={min}
          step={step}
          data-test-id={dataTestId}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full p-2 border rounded-full text-black"
        />
      </label>
    </div>
  );
};

export default InputField;
