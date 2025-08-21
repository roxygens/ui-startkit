import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeAll } from 'vitest'
import { QualityBar } from './quality-bar'

describe('QualityBar', () => {
  const getArrowContainer = (container: HTMLElement): HTMLElement => {
    const svgElement = container.querySelector('svg')
    if (!svgElement?.parentElement) {
      throw new Error('Arrow container not found')
    }
    return svgElement.parentElement
  }

  it('should display the value formatted to three decimal places', () => {
    render(<QualityBar value={0.12345} />)
    expect(screen.getByText('0.123')).toBeInTheDocument()
  })

  it('should position the arrow at 50% for a value of 0.5', () => {
    const { container } = render(<QualityBar value={0.5} />)
    const arrowContainer = getArrowContainer(container)

    expect(arrowContainer.style.left).toBe('50%')
  })

  it('should position the arrow at 0% for a value of 0', () => {
    const { container } = render(<QualityBar value={0} />)
    const arrowContainer = getArrowContainer(container)

    expect(screen.getByText('0.000')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('0%')
  })

  it('should position the arrow at 100% for a value of 1', () => {
    const { container } = render(<QualityBar value={1} />)
    const arrowContainer = getArrowContainer(container)

    expect(screen.getByText('1.000')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('100%')
  })

  it('should clamp a negative value to 0 and position the arrow at 0%', () => {
    const { container } = render(<QualityBar value={-0.5} />)
    const arrowContainer = getArrowContainer(container)

    expect(screen.getByText('0.000')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('0%')
  })

  it('should clamp a value greater than 1 to 1 and position the arrow at 100%', () => {
    const { container } = render(<QualityBar value={1.5} />)
    const arrowContainer = getArrowContainer(container)

    expect(screen.getByText('1.000')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('100%')
  })

  it('should position the arrow correctly for a non-trivial value like 0.257', () => {
    const { container } = render(<QualityBar value={0.257} />)
    const arrowContainer = getArrowContainer(container)

    expect(screen.getByText('0.257')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('25.7%')
  })

  it('should render all color sections with their correct colors and widths', () => {
    const expectedSections = [
      { color: 'rgb(76, 176, 64)', width: 12 },
      { color: 'rgb(103, 205, 75)', width: 13 },
      { color: 'rgb(224, 222, 82)', width: 40 },
      { color: 'rgb(234, 156, 84)', width: 13 },
      { color: 'rgb(226, 74, 79)', width: 92 },
    ]

    const { container } = render(<QualityBar value={0.5} />)
    const sectionsContainer = container.querySelector('.absolute.inset-0.flex')

    expect(sectionsContainer).not.toBeNull()

    expect(sectionsContainer?.children.length).toBe(expectedSections.length)

    expectedSections.forEach((expected, index) => {
      const child = sectionsContainer!.children[index]

      expect(child).toBeInstanceOf(HTMLElement)

      const sectionElement = child as HTMLElement

      expect(sectionElement.style.backgroundColor).toBe(expected.color)
      expect(sectionElement.style.width).toBe(`${expected.width}px`)
    })
  })

  describe('QualityBar Color Sections', () => {
    const sectionsData = [
      { name: 'Green', index: 0, hex: '#4CB040', rgb: 'rgb(76, 176, 64)', width: 12 },
      { name: 'Light Green', index: 1, hex: '#67CD4B', rgb: 'rgb(103, 205, 75)', width: 13 },
      { name: 'Yellow', index: 2, hex: '#E0DE52', rgb: 'rgb(224, 222, 82)', width: 40 },
      { name: 'Orange', index: 3, hex: '#EA9C54', rgb: 'rgb(234, 156, 84)', width: 13 },
      { name: 'Red', index: 4, hex: '#E24A4F', rgb: 'rgb(226, 74, 79)', width: 92 },
    ]

    let sectionsContainer: Element | null

    beforeAll(() => {
      const { container } = render(<QualityBar value={0.5} />)
      sectionsContainer = container.querySelector('.absolute.inset-0.flex')
    })

    it('should render the correct number of sections', () => {
      expect(sectionsContainer).not.toBeNull()
      expect(sectionsContainer?.children.length).toBe(sectionsData.length)
    })

    describe.each(sectionsData)('Section: $name ($hex)', ({ index, rgb, width }) => {
      it('should have the correct background color', () => {
        const child = sectionsContainer?.children[index]
        if (!(child instanceof HTMLElement)) {
          throw new Error('Section element not found or not an HTMLElement')
        }
        expect(child.style.backgroundColor).toBe(rgb)
      })

      it('should have the correct width', () => {
        const child = sectionsContainer?.children[index]
        if (!(child instanceof HTMLElement)) {
          throw new Error('Section element not found or not an HTMLElement')
        }
        expect(child.style.width).toBe(`${width}px`)
      })
    })
  })
})
