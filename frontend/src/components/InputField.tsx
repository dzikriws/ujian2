import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-2">
      <label className="floating-label">
        <span>{label} </span>
        <input
          type={type}
          name={name}
          placeholder=""
          className="input input-bordered w-full"
          value={value}
          onChange={onChange}
          required={required}
        />
      </label>
    </div>
  );
};

export default InputField;
