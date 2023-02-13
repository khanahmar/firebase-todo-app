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


function App() {
  const todoCollection = collection(db, "todos")
  const [todos, setTodos] = React.useState([])
  const [inpValue, setInpValue] = React.useState("")
  const [checkIt, setCheckIt] = React.useState(false)
  const [currentId, setCurrentId] = React.useState("")

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
  }, [todos])

  async function updateTodos() {
    const docRef = doc(db, "todos", currentId)
    await updateDoc(docRef, { text: inpValue, isDone: false })
    setCheckIt(false)
    setInpValue("")
  }

  async function addTodo() {
    if (inpValue !== "" && checkIt) {
      updateTodos()
    } else {
      if (inpValue !== "") {
        addDoc(todoCollection, { text: inpValue, isDone: false })
        setInpValue("")
        setCheckIt(false)
      }
    }
  }

  async function boxChecked(id, done) {
    const docRef = doc(db, "todos", id)
    await updateDoc(docRef, { isDone: !done })
  }

  async function deleteTodo(id) {
    const docRef = doc(db, "todos", id)
    await deleteDoc(docRef)
  }

  function updateIt(id, text) {
    setCheckIt(true)
    setCurrentId(id)
    setInpValue(text)
  }

  return (
    <div className="App">
      <h1>
        <strong>Tasks </strong>
        <span>Lists</span>
      </h1>
      <div className="inputs">
        <input
          type="text"
          value={inpValue}
          onChange={(e) => setInpValue(e.target.value)}
        />
        <button onClick={addTodo}>{checkIt ? "Update" : "Add"}</button>
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
              deleteTodo={deleteTodo}
              boxChecked={boxChecked}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default App
