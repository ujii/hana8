import { useId, type ChangeEvent, type RefObject } from 'react';

type Props = {
  type?: string;
  label?: string;
  ref?: RefObject<HTMLInputElement | null>;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  type,
  label,
  defaultValue,
  ref,
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
        id={inputId}
        ref={ref}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${className}`}
        required
      ></input>
    </div>
  );
}
