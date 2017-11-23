import React from 'react'
import { Heading } from '../../src/index'

describe('Karma', () => {
  it('should render Blue component via Enzyme into the DOM', () => {
    const wrapper = $mount(<Heading className='first'>Test</Heading>)

    expect(wrapper).to.exist
    expect(wrapper.height()).to.be.greaterThan(0)
    expect(wrapper.width()).to.be.greaterThan(0)
    expect(wrapper.css('color')).to.not.equal('rgba(0, 0, 0)')
    expect(wrapper[0].innerHTML).to.equal('Test')
  })

  it('should self clean', () => {
    const wrapper = $mount(<Heading className='new'>Test</Heading>)
    const body = wrapper.closest('body')

    expect(body.find('.first').length).to.equal(0)
  })
})
