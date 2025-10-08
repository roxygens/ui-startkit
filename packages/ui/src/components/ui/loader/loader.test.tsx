import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loader } from '.'

describe('Loader', () => {
  it('should not render when isOpen is false', () => {
    render(<Loader isOpen={false} />)
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    expect(document.querySelector('.animate-travel-square')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(<Loader isOpen={true} />)
    expect(document.querySelector('.animate-travel-square')).toBeInTheDocument()
  })

  it('should render provided text when isOpen is true', () => {
    render(<Loader isOpen={true} text="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('should render animated text element only when text is provided', () => {
    render(<Loader isOpen={true} text="Please wait" />)
    const animatedText = document.querySelector('.animate-pulse-text')
    expect(animatedText).toBeInTheDocument()
    expect(animatedText?.textContent).toBe('Please wait')
  })

  it('should not render text element when text is not provided', () => {
    render(<Loader isOpen={true} />)
    const textElement = document.querySelector('.animate-pulse-text')
    expect(textElement).not.toBeInTheDocument()
  })
})
