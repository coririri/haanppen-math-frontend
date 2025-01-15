import { forwardRef, Ref } from 'react';

interface InputBoxType {
  type?: string;
  placeholder?: string;
  isError?: boolean;
  moreStyle: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // event 타입 추가
  disabled?: boolean;
  value: string;
}

const InputBox = forwardRef(
  (
    {
      type = 'text',
      placeholder = '',
      isError = false,
      moreStyle,
      onChange,
      disabled = false,
      value = '',
    }: InputBoxType,
    ref: Ref<HTMLInputElement>,
  ) => (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`block px-4 py-3 text-md outline-none rounded-lg ${moreStyle} ${isError ? 'border-red-500 border-solid border-[2px]' : 'border-hpLightkBlack border-solid border-[1.3px]'}`}
      ref={ref}
      disabled={disabled}
      value={value}
    />
  ),
);

export default InputBox;
