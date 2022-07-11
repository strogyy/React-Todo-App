import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./todo";
import Input from "./input";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [btnClass, setBtnClass] = useState("fa-solid fa-plus");

  useEffect(() => {
    const addedTodos = JSON.parse(localStorage.getItem("added-todos"));
    if (addedTodos) {
      setTodos(addedTodos);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("added-todos", JSON.stringify(items));
  };

  const settingInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const addButtonHandle = () => {
    const customValue = inputValue.trim().toLocaleLowerCase();

    const filteredTodos = todos.filter((todo) => {
      if (todo === customValue) {
        toast.error("You cannot enter the same todo");
      }
      return !(todo === customValue);
    });

    const allToDos = [customValue, ...filteredTodos];

    if (allToDos && !(customValue === "") && customValue.length >= 3) {
      setTodos(allToDos);
      saveToLocalStorage(allToDos);
      setInputValue("");
      toast.success(
        `${customValue.toLocaleUpperCase()} is listed as a new todo`
      );
    } else if (customValue === "") {
      toast.warning("You haven't enter a todo");
    } else if (customValue.length < 3) {
      toast.warning("Your todo must be 3 letters or longer");
    }

    setBtnClass("fa-solid fa-plus");
  };

  const removeButtonHandle = (item) => {
    const removingFilter = todos.filter((todo) => {
      return !(todo === item);
    });

    if (removingFilter) {
      toast.info(`${item.toLocaleUpperCase()} is removed from your todo's`);
      setTodos(removingFilter);
      saveToLocalStorage(removingFilter);
    }
  };

  const updateButtonHandle = (item) => {
    const updatingFilter = todos.filter((todo) => {
      return !(todo === item);
    });
    setTodos(updatingFilter);
    saveToLocalStorage(updatingFilter);
    setInputValue(item);
    toast.info(`Todo ${item.toLocaleUpperCase()} is ready to update`);
    setBtnClass("fa-solid fa-check");
  };

  const handleIndex = (item) => {
    const filteredTodos = todos.filter((todo) => {
      return !(todo === item);
    });
    const allToDos = [item, ...filteredTodos];
    setTodos(allToDos);
    saveToLocalStorage(allToDos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className="todo-container">
        <div className="todo-inner">
          <div className="todo-input-container">
            <Input
              value={inputValue}
              settingInputValue={settingInputValue}
              placeholder="Add your to-do's..."
            />
            <button className="addButton" onClick={addButtonHandle}>
              <i className={btnClass}></i>
            </button>
          </div>

          <div className="todo-list">
            {todos.map((todo, index) => {
              return (
                <Todo
                  key={index}
                  updateButtonHandle={updateButtonHandle}
                  removeButtonHandle={removeButtonHandle}
                  indexButtonHandle={handleIndex}
                  index={index}
                  todo={todo}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
