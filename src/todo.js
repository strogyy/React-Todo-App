import React from "react";
const todo = ({ index, updateButtonHandle, removeButtonHandle, todo, indexButtonHandle }) => {
  return (
    <div className="todo">
      <div className="todo-element">
        <div className="item">
          <h3>{todo}</h3>
        </div>
        <div className="delButton">
          <i
            className="fa-solid fa-arrow-up"
            onClick={() => indexButtonHandle(todo, index)}
          ></i>

          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => updateButtonHandle(todo)}
          ></i>
          <i
            className="fa-solid fa-trash-can"
            onClick={() => removeButtonHandle(todo)}
          ></i>
        </div>
      </div>
    </div>
  );
};
export default todo;
