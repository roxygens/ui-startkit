import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loader } from '.'

describe('Loader', () => {
  it('should render with provided text', () => {
    render(<Loader text="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('should render default structure even without text', () => {
    render(<Loader />)
    const elements = document.querySelectorAll('div')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('should render animated square element', () => {
    render(<Loader />)
    const animatedElement = document.querySelector('.animate-travel-square')
    expect(animatedElement).toBeInTheDocument()
  })

  it('should render animated text element when text is provided', () => {
    render(<Loader text="Please wait" />)
    const animatedText = document.querySelector('.animate-pulse-text')
    expect(animatedText).toBeInTheDocument()
    expect(animatedText?.textContent).toBe('Please wait')
  })
})
