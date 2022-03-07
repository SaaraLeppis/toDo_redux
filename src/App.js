import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initNotes } from "./components/store/reducer";
import AddTodo from "./components/Todo/AddTodo";
import TodoList from "./components/Todo/TodoList";

const App = () => {
  // when application is loading we use axios 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initNotes());
  }, [dispatch]);

  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
