import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '.'

describe('Badge', () => {
  it('should render children', () => {
    const { getByText } = render(<Badge>Test Badge</Badge>)
    expect(getByText('Test Badge')).toBeInTheDocument()
  })

  it('should apply default variants', () => {
    const { getByText } = render(<Badge>Default Badge</Badge>)
    expect(getByText('Default Badge').className).toContain('text-[.6rem] px-[.66rem] py-[.22rem]')
    expect(getByText('Default Badge').className).toContain(
      'g-[#3BE2C21A] border-[#3BE2C259] text-[#3BE2C2]',
    )
  })

  it('should apply size md', () => {
    const { getByText } = render(<Badge size="md">Medium Badge</Badge>)
    expect(getByText('Medium Badge').className).toContain('text-[.6rem] px-[.66rem] py-[.22rem]')
  })

  it('should apply size lg', () => {
    const { getByText } = render(<Badge size="lg">Large Badge</Badge>)
    expect(getByText('Large Badge').className).toContain('px-[1rem] py-[.25rem] text-xs')
  })

  it('should apply variant success', () => {
    const { getByText } = render(<Badge variant="success">Success Badge</Badge>)
    expect(getByText('Success Badge').className).toContain(
      'bg-[#54DC621A] border-[#54DC6259] text-[#54DC62]',
    )
  })

  it('should apply variant info', () => {
    const { getByText } = render(<Badge variant="info">Info Badge</Badge>)
    expect(getByText('Info Badge').className).toContain(
      'bg-[#3BE2C21A] border-[#3BE2C259] text-[#3BE2C2]',
    )
  })

  it('should apply variant warning', () => {
    const { getByText } = render(<Badge variant="warning">Warning Badge</Badge>)
    expect(getByText('Warning Badge').className).toContain(
      'text-[#FFF172] border-white/15 bg-white/5',
    )
  })

  it('should apply variant danger', () => {
    const { getByText } = render(<Badge variant="danger">Danger Badge</Badge>)
    expect(getByText('Danger Badge').className).toContain(
      'bg-[#FF99211A] border-[#FF992159] text-[#FF9921]',
    )
  })

  it('should apply variant critical', () => {
    const { getByText } = render(<Badge variant="critical">Critical Badge</Badge>)
    expect(getByText('Critical Badge').className).toContain(
      'bg-[#FFFFFF0D] border-[#FFFFFF26] text-[#FF6868]',
    )
  })

  it('should merge custom className', () => {
    const { getByText } = render(<Badge className="custom-class">Custom Badge</Badge>)
    expect(getByText('Custom Badge').className).toContain('custom-class')
  })
})
