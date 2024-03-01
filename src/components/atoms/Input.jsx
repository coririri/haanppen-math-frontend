import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

function Input({
  type,
  inputRef,
  placeholder,
  handleClickSearch,
  handleCheckbox,
}) {
  if (type === 'singleLine') {
    return (
      <input
        className="w-full text-md font-cantarell font-bold rounded-lg border-[0.075rem] border-black bg-white px-2 py-[0.4rem] focus:outline-none"
        type="text"
        ref={inputRef}
      />
    );
  }
  if (type === 'multiLine') {
    return (
      <div className="w-[20rem] h-[30rem]">
        <textarea
          className="w-full h-full text-md font-cantarell font-bold bg-white focus:outline-none"
          ref={inputRef}
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
          ref={inputRef}
          placeholder={placeholder}
        />
        <button type="button" aria-label="Search" onClick={handleClickSearch}>
          <div className="w-[3.4rem] h-[3.5rem] flex items-center justify-center border-[0.15rem] border-solid border-[#DADADA] bg-[#DADADA]">
            <AiOutlineSearch size="3.3rem" color="#C1C1C1" />
          </div>
        </button>
      </div>
    );
  }
  if (type === 'checkbox') {
    return (
      <div>
        <input
          type="checkbox"
          className="w-[1.125rem] h-[1.125rem] mx-auto flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
          onChange={handleCheckbox}
        />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['singleLine', 'multiLine', 'search', 'checkbox'])
    .isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  placeholder: PropTypes.string,
  handleClickSearch: PropTypes.func,
  handleCheckbox: PropTypes.func,
};

Input.defaultProps = {
  placeholder: '',
  handleClickSearch: null,
  handleCheckbox: null,
};

export default Input;
