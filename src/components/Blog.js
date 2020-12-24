import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteBlog, updateBlog } from '../actions/actions'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
  const user = useSelector(state => state.users.currentUser)
  const dispatch = useDispatch()

  if (!blog) {
    return <p>Blog not found.</p>
  }

  const handleLike = () => {
    const updated = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(updated))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment(comment, blog.id))
    setComment('')
  }

  const comments = blog.comments && (
    <ul>
      {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
    </ul>
  )

  return (
    <section>
      <h2>{`${blog.title} by ${blog.author}`}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>Likes: {blog.likes} <button className='like' onClick={handleLike}>Like</button></p>
      <p>{`Added by ${user.name}.`}</p>
      {user.id === blog.user.id && (
        <button onClick={handleDelete}>Delete</button>
      )}
      <h2>Comments</h2>
      <form onSubmit={handleComment}>
        <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
        <button>Add Comment</button>
      </form>
      {comments}
    </section>
  )
}

export default Blog
