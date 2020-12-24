import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBlog, createNotification } from '../actions/actions'
import { BlogForm } from './BlogForm'


export const Home = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const createBlog = async ({ title, author, url }) => {
    dispatch(addBlog({ title, author, url }))
    dispatch(createNotification(`Added ${title} by ${author}.`, 3000))
  }

  return (
    <>
      <h1>Blogs</h1>
      <BlogForm handleSubmit={createBlog}></BlogForm>

      <div className="blogs">
        <ul>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <li key={blog.id}>
                <Link to={`blogs/${blog.id}`} >
                  {blog.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}