import React from 'react'
import { shallow } from 'enzyme'
import Bubble from '../Bubble'
import { Heading, LoadingDots, Text } from '../../'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-MessageBubble'
}

baseComponentTest(Bubble, baseComponentOptions)

describe('Title', () => {
  test('Does not render a Title by default', () => {
    const wrapper = shallow(<Bubble />)
    const o = wrapper.find(Heading)

    expect(o.length).toBe(0)
  })

  test('Renders a Title if defined', () => {
    const wrapper = shallow(<Bubble title='Mugatu' primary />)
    const o = wrapper.find(Heading)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-MessageBubble__title')).toBeTruthy()
    expect(o.node.props.children).toContain('Mugatu')
  })
})

describe('Typing', () => {
  test('Does not render a LoadingDots by default', () => {
    const wrapper = shallow(<Bubble />)
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(0)
  })

  test('Renders LoadingDots if typing', () => {
    const wrapper = shallow(<Bubble typing />)
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(1)
  })

  test('Renders LoadingDots instead of children if typing', () => {
    const wrapper = shallow(<Bubble typing>Mugatu</Bubble>)
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(1)
    expect(o.html()).not.toContain('Mugatu')
  })
})

describe('Content', () => {
  test('Text-based content is contained with a wordWrapped Text component', () => {
    const wrapper = shallow(
      <Bubble>
        Mugatu
      </Bubble>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBe(1)
    expect(o.node.props.wordWrap).toBeTruthy()
    expect(o.node.props.children).toBe('Mugatu')
  })

  test('Span-based content is contained with a wordWrapped Text component', () => {
    const wrapper = shallow(
      <Bubble>
        <span>
          Mugatu
        </span>
      </Bubble>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Mugatu')
  })

  test('Block-based content is not contained with a Text component', () => {
    const wrapper = shallow(
      <Bubble>
        <div>
          Mugatu
        </div>
      </Bubble>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBe(0)
    expect(wrapper.html()).toContain('Mugatu')
  })
})

describe('Styles', () => {
  test('Applies "from" styles, if defined', () => {
    const wrapper = shallow(<Bubble from />)

    expect(wrapper.hasClass('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = shallow(<Bubble to />)

    expect(wrapper.hasClass('is-to')).toBeTruthy()
  })

  test('Applies "note" styles, if defined', () => {
    const wrapper = shallow(<Bubble isNote />)

    expect(wrapper.hasClass('is-note')).toBeTruthy()
  })

  test('Applies "primary" styles, if defined', () => {
    const wrapper = shallow(<Bubble primary />)

    expect(wrapper.hasClass('is-primary')).toBeTruthy()
  })

  test('Applies "size" styles, if defined', () => {
    const wrapper = shallow(<Bubble size='sm' />)

    expect(wrapper.hasClass('is-sm')).toBeTruthy()
  })

  test('Applies "ltr" styles, if defined', () => {
    const wrapper = shallow(<Bubble ltr />)

    expect(wrapper.hasClass('is-ltr')).toBeTruthy()
  })

  test('Applies "rtl" styles, if defined', () => {
    const wrapper = shallow(<Bubble rtl />)

    expect(wrapper.hasClass('is-rtl')).toBeTruthy()
  })

  test('Applies "typing" styles, if defined', () => {
    const wrapper = shallow(<Bubble typing />)

    expect(wrapper.hasClass('is-typing')).toBeTruthy()
  })
})
