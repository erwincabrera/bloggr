import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import { Notification } from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNotification,
  setUser,
  initializeBlogs,
  initializeUsers,
} from './actions/actions'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { Home } from './components/Home'
import { Users } from './components/Users'
import { User } from './components/User'
import Blog from './components/Blog'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users.allUsers)
  const user = useSelector((state) => state.users.currentUser)
  const notification = useSelector((state) => state.notification)

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())

    try {
      const storedUser = window.localStorage.getItem('user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        dispatch(setUser(user))
      }
    } catch (err) {
      // Ignore error
    }

  }, [dispatch])


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username: username,
        password,
      })

      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(createNotification('Login failed', 3000))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(setUser(null))
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    )
  }

  if (user == null) {
    return (
      <div className="container">
        <h1>Login</h1>
        {notification && <Notification message={notification}></Notification>}
        {loginForm()}
      </div>
    )
  }

  const navbar = (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand href="#" className="border rounded border-info p-1 text-info">Bloggr</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span"><Link to='/' style={{ color: 'white' }}>Blogs</Link></Nav.Link>
            <Nav.Link href="#" as="span"><Link to='/users' style={{ color: 'white' }}>Users</Link></Nav.Link>
          </Nav>
          <Navbar.Text>{`Logged in as ${user.name}`}</Navbar.Text>
          <Button variant="info" size="sm" className="mx-1" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

  return (
    <Container fluid className="px-0">
      {navbar}
      {notification && <Notification message={notification}></Notification>}
      <Container>
        <Switch>
          <Route path='/users/:id'>
            <User user={userMatch
              ? users.find(user => user.id === userMatch.params.id)
              : null}
            />
          </Route>
          <Route path='/users'>
            <Users users={users}/>
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={blogMatch
              ? blogs.find(blog => blog.id === blogMatch.params.id)
              : null}
            />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </Container>
  )
}

export default App
