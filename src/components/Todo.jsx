import React from 'react';
import PropTypes from 'prop-types';

const Todo = (props) => {
  const {
    name, completed, id, toggleTaskCompleted, deleteTask,
  } = props;

  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          onChange={() => toggleTaskCompleted(id)}
          id={id}
          type="checkbox"
          defaultChecked={completed}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn">
          Edit
          {' '}
          <span className="visually-hidden">{name}</span>
        </button>
        <button type="button" className="btn btn__danger" onClick={() => deleteTask(id)}>
          Delete
          {' '}
          <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </li>
  );
};

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  toggleTaskCompleted: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Todo;
