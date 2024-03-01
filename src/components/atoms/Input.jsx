import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

function Input({
  type,
  size,
  placeholder,
  handleChange,
  handleClick,
  handleBlur,
  value,
}) {
  if (type === 'singleLine') {
    return (
      <input
        className="w-full text-md font-cantarell font-bold rounded-lg border-[0.075rem] border-black bg-white px-2 py-[0.4rem] focus:outline-none"
        type="text"
        defaultValue={value}
        onBlur={handleBlur}
      />
    );
  }
  if (type === 'multiLine') {
    return (
      <div className="w-[20rem] h-[30rem]">
        <textarea
          className="w-full h-full text-md font-cantarell font-bold bg-white focus:outline-none"
          defaultValue={value}
          onBlur={handleBlur}
        />
      </div>
    );
  }
  if (type === 'search') {
    return (
      <div className="flex items-center w-[15.75rem]">
        <input
          className="w-full h-[3.5rem] text-2xl font-cantarell rounded-l-md border-y-[0.15rem] border-l-[0.15rem] border-[#DADADA] bg-white px-2 py-[0.4rem] focus:outline-none"
          type="text"
          defaultValue={value}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        <button type="button" aria-label="Search" onClick={handleChange}>
          <div className="w-[3.4rem] h-[3.5rem] flex items-center justify-center border-[0.15rem] border-solid border-[#DADADA] bg-[#DADADA]">
            <AiOutlineSearch size="3.3rem" color="#C1C1C1" />
          </div>
        </button>
      </div>
    );
  }
  if (type === 'checkbox') {
    if (size === 'big')
      return (
        <div>
          <input
            type="checkbox"
            className="w-[1.68rem] h-[1.68rem] mx-auto flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
            onChange={handleClick}
          />
        </div>
      );
    if (size === 'normal')
      return (
        <div>
          <input
            type="checkbox"
            className="w-[1.125rem] h-[1.125rem] mx-auto flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
            onChange={handleClick}
          />
        </div>
      );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['singleLine', 'multiLine', 'search', 'checkbox'])
    .isRequired,
  size: PropTypes.oneOf(['normal', 'big', '']),
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  handleBlur: PropTypes.func,
  value: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  handleChange: null,
  handleClick: null,
  handleBlur: null,
  value: null,
  size: '',
};

export default Input;
