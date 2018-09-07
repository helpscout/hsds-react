import React from 'react'
import { StatusDot } from '../../../src/index'

describe('StatusDot', () => {
  it('should not align adjacent to sibling node by default', () => {
    mount(
      <div>
        <StatusDot className="dot" />
        <span className="text">Text</span>
      </div>
    )
    const dot = $('.dot')
    const text = $('.text')

    expect(text.offset().left).toBe(dot.offset().left)
    expect(text.offset().top).not.toBeLessThan(dot.offset().top + dot.height())
  })

  it('should align adjacent to sibling node, if inline', () => {
    mount(
      <div>
        <StatusDot inline className="dot" />
        <span className="text">Text</span>
      </div>
    )
    const dot = $('.dot')
    const text = $('.text')

    expect(text.offset().left).toBeGreaterThan(dot.offset().left)
    expect(text.offset().top).toBeLessThan(dot.offset().top + dot.height())
  })
})
