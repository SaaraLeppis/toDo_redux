import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./TodoList.module.css";
import * as actionTypes from '../store/actions';

const TodoList = () => {
  const notes = useSelector((state) => state);
  const [filteredValue, setFilteredValue] = useState();
  const [filterList, setFilteredList] = useState(notes);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const removeHandler = (id) => {
    console.log(id, "was clicked");
    dispatch({
      type: actionTypes.REMOVE_TODO,
      payload: id,
    })

  };
  const doneHandler = (id) => {
    console.log(id, "was clicked");
    dispatch({
      type: actionTypes.DONE_TODO,
      id: id,
    })
  };

  useEffect(() => {
    if (filteredValue === "true") {
      setFilteredList(
        notes.filter((item) => item.done === !!filteredValue)
      );
    } else if (filteredValue === "false") {
      setFilteredList(
        notes.filter((item) => item.done !== !!filteredValue)
      );
    } else {
      setFilteredList(notes);
    }
  }, [filteredValue, notes]);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredList(notes);
    } else {
      setFilteredList(notes.filter((note) => note.title.includes(searchValue)));
    }
  }, [searchValue, notes])

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  }
  const filterHandler = (e) => {
    setFilteredValue(e.target.value)
  }

  return (
    <div className={classes.todos}>
      <label for="search">Search from todos:</label>
      <input type="search" id="search" onChange={searchHandler} />

      <h1>Notes:</h1>
      <select name="done" id="done-selector" defaultValue="all" onChange={filterHandler}>
        <option value="true">Done</option>
        <option value="false">Not done</option>
        <option value="all">All </option>
      </select>

      {filterList?.map((note) => {
        return (
          <div
            onClick={() => doneHandler(note.id)}
            className={`${classes.todo} ${note.done ? classes.done : classes.notDone
              }`}
            key={note.id}
          >
            <h2>
              {note.title}
            </h2>
            <p>{note.task}</p>
            <span
              onClick={() => removeHandler(note.id)}
              className={`material-icons ${classes.delete}`}
            >
              delete
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
