import React from 'react'
import { shallow } from 'enzyme'
import Container from '../Container'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = shallow(<Container />)

    expect(wrapper.hasClass('o-container')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = shallow(<Container className='mugatu' />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = shallow(
      <Container>
        <div className='mugatu' />
      </Container>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = shallow(<Container style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Variants', () => {
  test('Correctly renders fluid variant', () => {
    const wrapper = shallow(<Container fluid />)

    expect(wrapper.hasClass('o-container')).toBeTruthy()
    expect(wrapper.hasClass('o-container--fluid')).toBeTruthy()
    expect(wrapper.hasClass('o-container--responsive')).not.toBeTruthy()
  })

  test('Correctly renders responsive variant', () => {
    const wrapper = shallow(<Container responsive />)

    expect(wrapper.hasClass('o-container')).toBeTruthy()
    expect(wrapper.hasClass('o-container--responsive')).toBeTruthy()
    expect(wrapper.hasClass('o-container--fluid')).not.toBeTruthy()
  })
})
