import React from 'react'

export const User = ({ user }) => {
  if (!user) {
    return <div>User not found.</div>
  }

  const hasBlogs = user.blogs.length > 0

  const blogList = hasBlogs
    ? (
      <>
        <h3>Added Blogs</h3>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </>
    )
    : <p>No blogs added.</p>

  return (
    <>
      <h2>{user.name}</h2>
      {blogList}
    </>
  )
}