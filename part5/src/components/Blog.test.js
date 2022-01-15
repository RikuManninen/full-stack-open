import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('blog tests', () => {
  let component
  let blog

  beforeEach(() => {
    blog = {
      title: 'React component testing in a nutshell',
      author: 'Riku Manninen',
      url: 'https://www.rikumanninen.fi/blogi',
      likes: 0
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('at start only blogs title and author is rendered', () => {
    const minimizedDiv = component.container.querySelector('.minimizedContent')
    const expandedDiv = component.container.querySelector('.expandedContent')
    expect(expandedDiv).toHaveStyle('display: none')
    expect(minimizedDiv).toHaveTextContent(`${blog.title} ${blog.author}`)
  })
})