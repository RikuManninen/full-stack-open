import { useMutation } from "@apollo/client"
import { useState } from "react"
import { LOGIN } from "../queries"

const Login = ({ show, handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN)

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    setUsername('')
    setPassword('')

    console.log('logging in...')

    const result = await login({
      variables: {
        username,
        password
      }
    })

    const token = result.data.login.value

    handleLogin(token)
  }

  return (
    <div>
      <form onSubmit={submit}>
        username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        <div>
        password
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login