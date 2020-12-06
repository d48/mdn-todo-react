import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const [tasks = [], setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const addTask = (task) => {
    const newTask = {
      id: `todo-${nanoid()}`,
      name: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });

    setTasks(editedTaskList);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      isPressed={name === filter}
      setFilter={setFilter}
      key={name}
      name={name}
    />
  ));

  const headingNoun = taskList.length === 1 ? 'task' : 'tasks';
  const heading = `${taskList.length} ${headingNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {heading}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};

export default App;
