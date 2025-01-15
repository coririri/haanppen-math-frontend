interface TextButtonType {
  color: 'white' | 'gray'; // 색상 옵션 확장 가능
  children: React.ReactNode;
  handleClick: () => void;
  moreStyle?: string; // optional로 변경
  textMoreStyle?: string; // optional로 변경
  isClick?: boolean; // optional로 변경
}

function TextButton({
  color,
  children,
  handleClick,
  moreStyle,
  textMoreStyle,
  isClick,
}: TextButtonType) {
  if (color === 'white') {
    return (
      <button type="button" onClick={handleClick}>
        <div
          className={`inline-block border-solid border-black border-[1.75px] rounded-lg text-center ${isClick ? 'bg-hpWhiteBlue' : 'hover:bg-hpWhiteBlue bg-white'} ${moreStyle} `}
        >
          <span className={`font-bold leading-10 text-black ${textMoreStyle}`}>
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
        <span className={`font-bold text-lg text-black ${textMoreStyle}`}>
          {children}
        </span>
      </button>
    );

  return (
    <button
      className={`inline-block border-hpGray border-[0.072rem] rounded-full bg-hpLightGray hover:bg-hpHoverLightGray ${moreStyle}`}
      type="button"
      onClick={handleClick}
    >
      <span className={`font-bold text-lg text-black ${textMoreStyle}`}>
        {children}
      </span>
    </button>
  );
}

export default TextButton;
