import React from 'react'
import { Heading } from '../../src/index'

describe('Karma', () => {
  it('should render Blue component via Enzyme into the DOM', () => {
    const wrapper = $mount(<Heading className="first">Test</Heading>)

    expect(wrapper).toBeTruthy()
    expect(wrapper.height()).toBeGreaterThan(0)
    expect(wrapper.width()).toBeGreaterThan(0)
    expect(wrapper.css('color')).not.toBe('rgba(0, 0, 0)')
    expect(wrapper[0].innerHTML).toBe('Test')
  })

  it('should self clean', () => {
    const wrapper = $mount(<Heading className="new">Test</Heading>)
    const body = wrapper.closest('body')

    expect(body.find('.first').length).toBe(0)
  })
})
