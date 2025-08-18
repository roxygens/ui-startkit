import { beforeAll, vi } from 'vitest'

import '@testing-library/jest-dom'

beforeAll(() => {
  // @ts-ignore
  window.PointerEvent = class PointerEvent extends Event {}
  window.HTMLElement.prototype.hasPointerCapture = vi.fn()
  window.HTMLElement.prototype.releasePointerCapture = vi.fn()
  window.HTMLElement.prototype.setPointerCapture = vi.fn()
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})
