import { useState } from 'react'

function App() {

  const [todoList, setTodoList] = useState([
    {title: "Learn React", description: "Get comfortable with React before monday"},
    {title: "Get Comfortable with bike", description: "Important for exploring new things"}
  ])

  return (
    <>
    <Button todoList={todoList} setTodoList={setTodoList}></Button>
    {todoList.map(todo => <Todo title={todo.title} description={todo.description}></Todo>)}
    </>
  )
}

function Button({todoList, setTodoList}) {
  return (
    <button onClick={() => {setTodoList([...todoList, {title: "New Todo", description: "Description of new Todo"}])}}>Add Todo</button>
  )
}

function Todo({title, description}){
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
    </>
  )
}

export default App
