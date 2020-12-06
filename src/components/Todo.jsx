import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Todo = (props) => {
  const {
    name, completed, id, toggleTaskCompleted, deleteTask, editTask,
  } = props;

  const [newName, setNewName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.editTask(props.id, newName);
    setNewName('');
    setIsEditing(false);
  };

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for
          {' '}
          {name}
        </label>
        <input
          value={newName}
          onChange={handleChange}
          id={id}
          className="todo-text"
          type="text"
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
          Cancel
          <span className="visually-hidden">
            renaming
            {' '}
            {name}
          </span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" onClick={() => editTask(id, newName)}>
          Save
          <span className="visually-hidden">
            new name for
            {' '}
            {name}
          </span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="todo stack-small">
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
        <button type="button" className="btn" onClick={() => setIsEditing(true)}>
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
    </div>
  );

  return (
    <li className="todo">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
};

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  toggleTaskCompleted: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default Todo;
