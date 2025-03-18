import React from "react";

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-2">
      <label className="block font-semibold text-white">{label}</label>
      <textarea
        name={name}
        className="textarea textarea-bordered w-full"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextAreaField;
