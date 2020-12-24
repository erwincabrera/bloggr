export const blogs = (state = [], action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return action.payload.blogs
  case 'ADD_BLOG':
    return state.concat(action.payload.blog)
  case 'UPDATE_BLOG':
    return state.map(eachBlog =>
      eachBlog.id === action.payload.blog.id
        ? action.payload.blog
        : eachBlog
    )
  case 'DELETE_BLOG':
    return state.filter(eachBlog => eachBlog.id !== action.payload.id)
  case 'ADD_COMMENT':
    return state.map(eachBlog =>
      eachBlog.id !== action.payload.blogId
        ? eachBlog
        : {
          ...eachBlog,
          comments: [
            ...eachBlog.comments,
            action.payload.comment
          ]
        }
    )
  default:
    return state
  }
}
