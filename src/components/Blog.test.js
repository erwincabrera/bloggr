import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import Blog from './Blog'

test('initially renders blog title and author only', () => {
  const blog = {
    title: 'Testing the blog',
    author: 'Foo Bar',
    url: 'www.example.com',
    likes: 2
  }

  const component = render(<Blog blog={blog}/>)

  expect(component.container).toHaveTextContent('Testing the blog')
  expect(component.container).toHaveTextContent('Foo Bar')
  expect(component.container).not.toHaveTextContent('www.example.com')
  expect(component.container).not.toHaveTextContent('Likes:')
})

test('blog url and likes are shown when button is clicked', () => {
  const user = {
    name: 'User',
    id: 1,
  }

  const blog = {
    title: 'Testing the blog',
    author: 'Foo Bar',
    url: 'www.example.com',
    likes: 2,
    user
  }

  const component = render(<Blog blog={blog} user={user} />)

  const button = component.getByText('Show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.example.com')
  expect(component.container).toHaveTextContent('Likes: 2')
})

test('handles like', () => {
  const user = {
    name: 'User',
    id: 1,
  }
  const blog = {
    title: 'Testing the blog',
    author: 'Foo Bar',
    url: 'www.example.com',
    likes: 2,
    user
  }

  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} user={user} handleLike={mockHandler} />)

  const detailedButton = component.getByText('Show')
  fireEvent.click(detailedButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
