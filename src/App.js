import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createBlog } from './graphql/mutations'
import { listBlogs } from './graphql/queries'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { id: '', name: ''}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listBlogs))
      const todos = todoData.data.listBlogs.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.id || !formState.name) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createBlog, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <div style={styles.container}>
      <AmplifySignOut />
      <h2>Avannis Banks</h2>
      <input
        onChange={event => setInput('id', event.target.value)}
        style={styles.input}
        value={formState.id}
        placeholder="ID"
      />
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <button style={styles.button} onClick={addTodo}>Create Bank</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);
