import blogService from '../services/blogs'
import usersService from '../services/users'

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    payload: {
      blogs
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'SET_BLOGS',
        payload: {
          blogs
        }
      })
    } catch(err) {
      // Ignore error
    }
  }
}

export const addBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create({ title, author, url })
      dispatch({
        type: 'ADD_BLOG',
        payload: {
          blog
        }
      })
    } catch (err) {
      // Ignore error
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.update(blog)
      dispatch({
        type: 'UPDATE_BLOG',
        payload: {
          blog
        }
      })
    } catch (err) {
      // Ignore error
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.deleteBlog(blog)
      if (response.status === 204) {
        dispatch({
          type: 'DELETE_BLOG',
          payload: {
            id: blog.id
          }
        })
      }
    } catch (err) {
      // Ignore error
    }
  }
}

let timeoutId

export const createNotification = (text, timeout) => {
  return (dispatch) => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      payload: {
        text
      }
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(clearNotifications())
    }, timeout)
  }
}

export const clearNotifications = () => {
  return {
    type: 'CLEAR_NOTIFICATIONS'
  }
}

export const setUser = (user) => {
  blogService.setToken(user ? user.token : null)

  return {
    type: 'SET_USER',
    payload: {
      user
    }
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.get()
      dispatch({
        type: 'INITIALIZE_USERS',
        payload: {
          users
        }
      })
    } catch (err) {
      // Ignore error
    }
  }
}

export const addComment = (comment, blogId) => {
  return async (dispatch) => {
    try {
      await blogService.addComment(comment, blogId)
      dispatch({
        type: 'ADD_COMMENT',
        payload: {
          comment,
          blogId
        }
      })
    } catch (err) {
      // Ignore error
    }
  }
}