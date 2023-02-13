import React from "react"
import "./App.css"
import Todo from "./Todo"
import { db } from "./firebase"
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore"
import { async } from "@firebase/util"

function App() {
  const todoCollection = collection(db, "todos")
  const [todos, setTodos] = React.useState([])
  const [inpValue, setInpValue] = React.useState("")
  const [checkIt, setCheckIt] = React.useState(false)
  const [currentId]

  React.useEffect(() => {
    const unsubscribe = onSnapshot(todoCollection, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => {
          return { data: doc.data(), id: doc.id }
        })
      )
      return () => {
        unsubscribe()
      }
    })
  }, [])

  async function addTodo() {
    if (inpValue !== "") {
      addDoc(todoCollection, { text: inpValue, isDone: false })
      setInpValue("")
    }
  }

  function updateIt(id) {}

  return (
    <div className="App">
      <h1>
        <strong>Tasks </strong>
        <span>Lists</span>
      </h1>
      <div>
        <input
          type="text"
          value={inpValue}
          onChange={(e) => setInpValue(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <Todo
              id={todo.id}
              key={todo.id}
              text={todo.data.text}
              isDone={todo.data.isDone}
              updateIt={updateIt}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default App
