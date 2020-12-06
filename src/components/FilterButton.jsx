import React from 'react';
import PropTypes from 'prop-types';

const FilterButton = (props) => {
  const { isPressed, name, setFilter } = props;

  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>
        {name}
        {' '}
      </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
};

FilterButton.propTypes = {
  isPressed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterButton;
