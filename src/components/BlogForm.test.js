import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { BlogForm } from './BlogForm'

test('correctly calls the event handler when a new blog is created', () => {

  const handleSubmit = jest.fn()

  const component = render(
    <BlogForm handleSubmit={handleSubmit} />
  )

  const titleInput = component.container.querySelector('#titleInput')
  const authorInput = component.container.querySelector('#authorInput')
  const urlInput = component.container.querySelector('#urlInput')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'A new blog' }
  })

  fireEvent.change(authorInput, {
    target: { value: 'A new author' }
  })

  fireEvent.change(urlInput, {
    target: { value: 'A new url' }
  })

  fireEvent.submit(form)

  expect(handleSubmit.mock.calls).toHaveLength(1)
  expect(handleSubmit.mock.calls[0][0].title).toBe('A new blog')
  expect(handleSubmit.mock.calls[0][0].author).toBe('A new author')
  expect(handleSubmit.mock.calls[0][0].url).toBe('A new url')
  console.log(handleSubmit.mock.calls)
})
