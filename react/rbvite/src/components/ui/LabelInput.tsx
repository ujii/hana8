import { useId, type ChangeEvent } from 'react';

type Props = {
  type?: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  type,
  label,
  onChange,
  placeholder,
  className,
}: Props) {
  const inputId = useId();
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className='test-sm text-gray-600'>
          {label}
        </label>
      )}
      <input
        type={type || 'text'}
        id='name'
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${className}`}
        required
      ></input>
    </div>
  );
}
