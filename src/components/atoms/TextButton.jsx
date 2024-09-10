function TextButton({ color, children, handleClick, moreStyle, isClick }) {
  if (color === 'white') {
    return (
      <button type="button" onClick={handleClick}>
        <div
          className={`inline-block border-solid border-black border-[1.75px] rounded-lg text-center ${isClick ? 'bg-hpWhiteBlue' : 'hover:bg-hpWhiteBlue bg-white'} ${moreStyle} `}
        >
          <span className="text-xl font-bold leading-10 text-black">
            {children}
          </span>
        </div>
      </button>
    );
  }

  if (color === 'gray')
    return (
      <button
        className={`inline-block border-hpGray border-[0.072rem] rounded-full bg-hpLightGray hover:bg-hpHoverLightGray ${moreStyle}`}
        type="button"
        onClick={handleClick}
      >
        <span className="font-bold text-lg text-black">{children}</span>
      </button>
    );
}

export default TextButton;
