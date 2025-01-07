import React, { forwardRef, Ref } from 'react';

interface TextareaType {
  placeholder?: string;
  isError?: boolean;
  moreStyle: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // event 타입 추가
  disabled?: boolean;
  value: string;
}

const Textarea = forwardRef(
  (
    {
      placeholder = '',
      isError = false,
      moreStyle,
      onChange,
      disabled = false,
      value = '',
    }: TextareaType,
    ref: Ref<HTMLTextAreaElement>,
  ) => (
    <textarea
      placeholder={placeholder}
      onChange={onChange}
      className={`block px-4 py-3 text-md outline-none rounded-lg ${moreStyle} ${isError ? 'border-red-500 border-solid border-[2px]' : 'border-hpLightkBlack border-solid border-[1.3px]'}`}
      ref={ref}
      disabled={disabled}
      value={value}
    />
  ),
);

export default Textarea;
