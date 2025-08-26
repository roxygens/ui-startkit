import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeAll } from 'vitest'
import { ScoreBar } from '.'

describe('ScoreBar', () => {
  const getArrowContainer = (container: HTMLElement): HTMLElement => {
    const svgElement = container.querySelector('svg')
    if (!svgElement?.parentElement) {
      throw new Error('Arrow container not found')
    }
    return svgElement.parentElement
  }

  it('should display the value formatted to three decimal places', () => {
    render(<ScoreBar value={0.12345} />)
    expect(screen.getByText('0.123')).toBeInTheDocument()
  })

  it('should position the arrow at 50% for a value of 0.5', () => {
    const { container } = render(<ScoreBar value={0.5} />)
    const arrowContainer = getArrowContainer(container)
    expect(arrowContainer.style.left).toBe('50%')
  })

  it('should position the arrow at 0% for a value of 0', () => {
    const { container } = render(<ScoreBar value={0} />)
    const arrowContainer = getArrowContainer(container)
    expect(screen.getByText('0.000')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('0%')
  })

  it('should position the arrow at 100% for a value of 1', () => {
    const { container } = render(<ScoreBar value={1} />)
    const arrowContainer = getArrowContainer(container)
    expect(screen.getByText('1.000')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('100%')
  })

  it('should clamp a negative value to 0 and position the arrow at 0%', () => {
    const { container } = render(<ScoreBar value={-0.5} />)
    const arrowContainer = getArrowContainer(container)
    expect(screen.getByText('0.000')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('0%')
  })

  it('should clamp a value greater than 1 to 1 and position the arrow at 100%', () => {
    const { container } = render(<ScoreBar value={1.5} />)
    const arrowContainer = getArrowContainer(container)
    expect(screen.getByText('1.000')).toBeInTheDocument()
    expect(arrowContainer.style.left).toBe('100%')
  })

  it('should position the arrow correctly for a non-trivial value like 0.257', () => {
    const { container } = render(<ScoreBar value={0.257} />)
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

    const { container } = render(<ScoreBar value={0.5} />)
    const sectionsContainer = container.querySelector('.absolute.inset-0.flex')
    if (!(sectionsContainer instanceof HTMLElement)) {
      throw new Error('Sections container not found or not an HTMLElement')
    }

    const children = Array.from(sectionsContainer.children)
    expect(children.length).toBe(expectedSections.length)

    children.forEach((childElement, index) => {
      if (!(childElement instanceof HTMLElement)) {
        throw new Error(`Child at index ${index} is not an HTMLElement`)
      }

      const { color: expectedColor, width: expectedWidth } = expectedSections[index]
      expect(childElement.style.backgroundColor).toBe(expectedColor)
      expect(childElement.style.width).toBe(`${expectedWidth}px`)
    })
  })

  describe('ScoreBar Color Sections', () => {
    const sectionsData = [
      { name: 'Green', index: 0, hex: '#4CB040', rgb: 'rgb(76, 176, 64)', width: 12 },
      { name: 'Light Green', index: 1, hex: '#67CD4B', rgb: 'rgb(103, 205, 75)', width: 13 },
      { name: 'Yellow', index: 2, hex: '#E0DE52', rgb: 'rgb(224, 222, 82)', width: 40 },
      { name: 'Orange', index: 3, hex: '#EA9C54', rgb: 'rgb(234, 156, 84)', width: 13 },
      { name: 'Red', index: 4, hex: '#E24A4F', rgb: 'rgb(226, 74, 79)', width: 92 },
    ]

    let sectionsContainer: HTMLElement

    beforeAll(() => {
      const { container } = render(<ScoreBar value={0.5} />)
      const containerEl = container.querySelector('.absolute.inset-0.flex')
      if (!(containerEl instanceof HTMLElement)) {
        throw new Error('Sections container not found or not an HTMLElement')
      }
      sectionsContainer = containerEl
    })

    it('should render the correct number of sections', () => {
      expect(sectionsContainer.children.length).toBe(sectionsData.length)
    })

    describe.each(sectionsData)('Section: $name ($hex)', ({ index, rgb, width }) => {
      it('should have the correct background color and width', () => {
        const child = sectionsContainer.children[index]

        expect(child).toBeInstanceOf(HTMLElement)

        const htmlElement = child as HTMLElement

        expect(htmlElement.style.backgroundColor).toBe(rgb)

        expect(htmlElement.style.width).toBe(`${width}px`)
      })
    })
  })
})
