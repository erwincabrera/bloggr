import React, { useRef, useState } from 'react'
import { Togglable } from './Togglable'

export const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()
  const onSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit({ title, author, url })
    blogFormRef.current.toggle()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable label={'New blog'} ref={blogFormRef}>
      <>
        <h2>New</h2>
        <form onSubmit={onSubmit}>
          <div>
            <input
              id="titleInput"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title"
            ></input>
          </div>
          <div>
            <input
              id="authorInput"
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              placeholder="Author"
            ></input>
          </div>
          <div>
            <input
              id="urlInput"
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              placeholder="URL"
            ></input>
          </div>
          <button type="submit">Create</button>
        </form>
      </>
    </Togglable>
  )
}
