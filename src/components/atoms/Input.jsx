import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

function Input({
  type,
  handleClick,
  handleBlur,
  handleChange,
  handleClickSearch,
  defaultValue,
  placeholder,
}) {
  if (type === 'singleLine') {
    return (
      <input
        className="w-full text-md font-cantarell font-bold rounded-lg border-[0.075rem] border-black bg-white px-2 py-[0.4rem] focus:outline-none"
        type="text"
        onClick={handleClick}
        onBlur={handleBlur}
        onChange={handleChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    );
  }
  if (type === 'multiLine') {
    return (
      <textarea
        className="w-[20rem] h-[30rem] text-md font-cantarell font-bold bg-white focus:outline-none"
        onClick={handleClick}
        onBlur={handleBlur}
        onChange={handleChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    );
  }
  if (type === 'search') {
    return (
      <div className="flex items-center w-[15.75rem]">
        <input
          className="w-full h-[3.5rem] text-2xl font-cantarell rounded-l-md border-y-[0.15rem] border-l-[0.15rem] border-[#DADADA] bg-white px-2 py-[0.4rem] focus:outline-none"
          type="text"
          onClick={handleClick}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={defaultValue}
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
      <input
        type="checkbox"
        className="w-full h-full border-[0.075rem] border-solid border-hpBlack"
        onClick={handleClick}
        onBlur={handleBlur}
        onChange={handleChange}
        defaultValue={defaultValue}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['singleLine', 'multiLine', 'checkbox', 'search'])
    .isRequired,
  handleClick: PropTypes.func,
  handleClickSearch: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  defaultValue: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  handleClick: null,
  handleClickSearch: null,
  handleBlur: null,
  handleChange: null,
  defaultValue: null,
  placeholder: null,
};

export default Input;
