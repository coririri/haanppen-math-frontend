import React, { forwardRef } from 'react';

const Textarea = forwardRef(
  (
    {
      type,
      placeholder,
      isError = false,
      moreStyle,
      onChange,
      disabled = false,
      value = '',
    },
    ref,
  ) => (
    <textarea
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

export default Textarea;
