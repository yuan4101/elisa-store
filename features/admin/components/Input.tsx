import TextareaAutosize from "react-textarea-autosize";

interface TextInputProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ label, hint, value, onChange }: TextInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
        {hint && <span className="text-gray-500"> {hint}</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md mt-1"
      />
    </div>
  );
}

interface SelectInputProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function SelectInput({
  label,
  hint,
  value,
  onChange,
  options,
}: SelectInputProps) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium">
        {label}
        {hint && <span className="text-gray-500"> {hint}</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md mt-1"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface NumberInputProps {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  allowDecimals?: boolean;
}

export function NumberInput({
  label,
  hint,
  value,
  onChange,
  allowDecimals = false,
}: NumberInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
        {hint && <span className="text-gray-500"> {hint}</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          const pattern = allowDecimals ? /^[0-9.]+$/ : /^[0-9]+$/;
          if (val === "" || pattern.test(val)) {
            onChange(val === "" ? 0 : Number(val));
          }
        }}
        className="w-full p-2 border rounded-md mt-1"
      />
    </div>
  );
}

interface TextareaInputProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  minRows?: number;
}

export function TextareaInput({
  label,
  hint,
  value,
  onChange,
  minRows = 2,
}: TextareaInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
        {hint && <span className="text-gray-500"> {hint}</span>}
      </label>
      <TextareaAutosize
        value={value}
        onChange={(e) => onChange(e.target.value)}
        minRows={minRows}
        className="w-full p-2 border rounded-md mt-1 resize-none"
      />
    </div>
  );
}

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export function CheckboxInput({
  label,
  checked,
  onChange,
  id,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mr-2"
      />
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
    </div>
  );
}
