import React from 'react'
import { mount } from 'enzyme'
import Row from '../Row'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = mount(<Row />)

    expect(wrapper.hasClass('c-Row')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = mount(<Row className="mugatu" />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = mount(
      <Row>
        <div className="mugatu" />
      </Row>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Flex', () => {
  test('Can render flex (old) version of Row', () => {
    const wrapper = mount(<Row flex />)

    expect(wrapper.hasClass('is-flex')).toBeTruthy()
  })

  test('Can render flex version of Row', () => {
    const wrapper = mount(<Row isFlex />)

    expect(wrapper.hasClass('is-flex')).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = mount(<Row style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Size', () => {
  test('Can render an additional size', () => {
    const wrapper = mount(<Row size="md" />)

    expect(wrapper.hasClass('c-Row')).toBeTruthy()
    expect(wrapper.hasClass('is-md')).toBeTruthy()
  })
})
