import React from "react"

const Todo = (props) => {
  const { text, isDone, id, key } = props
  return (
    <li className={isDone ? "checked" : ""} key={key}>
      <div className="checkbox"></div>
      {text}
      <div className="icons">
        <i className="fa-sharp fa-solid fa-pen-to-square"></i>
        <i className="fa-sharp fa-solid fa-trash"></i>
      </div>
    </li>
  )
}

export default Todo
