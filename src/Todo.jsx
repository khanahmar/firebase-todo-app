import React from "react"

const Todo = (props) => {
  const { text, isDone, id, key, updateIt, deleteTodo, boxChecked } = props
  return (
    <li className={isDone ? "checked" : ""} key={key}>
      <div
        onClick={() => boxChecked(id, isDone)}
        className={isDone ? "checked-box" : "checkbox"}
      ></div>
      {text}
      <div className="icons">
        <i
          onClick={() => updateIt(id, text)}
          className="fa-sharp fa-solid fa-pen-to-square"
        ></i>
        <i
          onClick={() => deleteTodo(id)}
          className="fa-sharp fa-solid fa-trash"
        ></i>
      </div>
    </li>
  )
}

export default Todo
