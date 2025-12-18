import type { PropsWithChildren } from 'react';

type Prop = {
  onClick?: () => void;
  type?: 'reset' | 'submit';
  disabled?: boolean;
  className?: string;
};

export default function Btn({
  onClick,
  type,
  className,
  disabled,
  children,
}: PropsWithChildren<Prop>) {
  return (
    <button
      type={type}
      className={` ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
