function TextButton({
  children,
  color,
  shape,
  size,
  isClick,
  handleClick,
  moreStyle,
}) {
  if (color === 'white')
    if (shape === 'long')
      return (
        <button
          className={`inline-block w-[16.75rem] h-[2.375rem]  border-hpBlack border-[0.072rem] rounded-lg font-bold ${isClick ? 'bg-hpWhiteBlue' : 'bg-white'} ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          <span className="text-[1.7rem] leading-[2.375rem]">{children}</span>
        </button>
      );
    else if (shape === 'square')
      return (
        <button
          className={`inline-block w-[2.6rem] h-[2.6rem] py-1 px-2 border-[0.072rem] rounded-lg text-xl font-bold ${isClick ? 'bg-hpWhiteBlue border-hpClickedWhiteBlue' : 'bg-white border-hpGray'} ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          {children}
        </button>
      );
  if (color === 'gray')
    return (
      <button
        className={`inline-block w-[6.25rem] h-[2rem] border-hpGray border-[0.072rem] rounded-full font-bold bg-hpLightGray hover:bg-hpHoverLightGray ${moreStyle}`}
        type="button"
        onClick={handleClick}
      >
        <span className="text-xl">{children}</span>
      </button>
    );
  if (shape === 'math') {
    if (size === 'big') {
      return (
        <button
          className={`inline-block w-[2.125rem] h-[2.125rem] border-hpWhiteBlue border-[0.072rem] rounded-full font-bold bg-hpWhiteBlue hover:border-hpClickedWhiteBlue ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          <span className="text-3xl leading-[2.125rem]">{children}</span>
        </button>
      );
    }
    if (size === 'small') {
      return (
        <button
          className={`inline-block w-[1.43rem] h-[1.43rem] border-hpWhiteBlue border-[0.072rem] rounded-full font-bold bg-hpWhiteBlue hover:border-hpClickedWhiteBlue ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          <span className="text-xl leading-[1.43rem]">{children}</span>
        </button>
      );
    }
    if (size === 'tooSmall') {
      return (
        <button
          className={`inline-block w-[1.2rem] h-[1.2rem] leading-[1.2rem] bg-hpBlack text-white hover:border-hpBlack border-hpLightBlack border-[0.072rem] rounded-full font-bold ${moreStyle}`}
          type="button"
          onClick={handleClick}
        >
          <span className="text-xl leading-[1.2rem]">{children}</span>
        </button>
      );
    }
  }
}

export default TextButton;
