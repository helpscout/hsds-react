import React from 'react'
import { mount, shallow } from 'enzyme'
import CardBlock from '../Block'
import Scrollable from '../../Scrollable'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<CardBlock />)

    expect(wrapper.prop('className')).toBe('c-Card__block')
  })

  test('Accepts custom className', () => {
    const wrapper = shallow(<CardBlock className='not-metro-man' />)

    expect(wrapper.prop('className')).toContain('not-metro-man')
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<CardBlock>Megamind</CardBlock>)

    expect(wrapper.text()).toBe('Megamind')
  })

  test('Render child components', () => {
    const wrapper = mount(
      <CardBlock className='mega'>
        <CardBlock className='mind'>
          Megamind
        </CardBlock>
      </CardBlock>
    )

    const innerCardBlock = wrapper.childAt(0)

    expect(innerCardBlock.exists()).toBeTruthy()
    expect(innerCardBlock.prop('className')).toContain('mind')
    expect(innerCardBlock.text()).toBe('Megamind')
  })
})

describe('Click', () => {
  test('Can trigger onClick callback', () => {
    let value = false
    const onClick = () => { value = true }
    const wrapper = shallow(<CardBlock onClick={onClick} />)

    wrapper.simulate('click')

    expect(value).toBeTruthy()
  })
})

describe('Scrollable', () => {
  test('Does not render Scrollable by default', () => {
    const wrapper = shallow(<CardBlock />)
    const o = wrapper.find(Scrollable)

    expect(o.length).toBe(0)
  })

  test('Renders Scrollable if specified', () => {
    const wrapper = mount(<CardBlock scrollable />)
    const o = wrapper.find(Scrollable)
    const n = wrapper.find('.c-Card__block')

    expect(o.length).toBe(1)
    expect(o.hasClass('c-Card__block')).toBeTruthy()
    expect(o.hasClass('is-scrollable')).toBeTruthy()
    expect(n.length).toBe(2)

    wrapper.unmount()
  })

  test('Renders Scrollable with flex if specified', () => {
    const wrapper = shallow(<CardBlock scrollable flex />)
    const o = wrapper.find(Scrollable)

    expect(o.length).toBe(1)
    expect(o.hasClass('is-scrollable')).toBeTruthy()
    expect(o.hasClass('is-flex')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Does not have a size modifier style by default', () => {
    const wrapper = shallow(<CardBlock />)
    const classNames = wrapper.prop('className')

    expect(classNames).not.toContain('c-Card__block--sm')
    expect(classNames).not.toContain('c-Card__block--md')
    expect(classNames).not.toContain('c-Card__block--lg')
  })

  test('Renders size styles, if specified', () => {
    const wrapper = shallow(<CardBlock size='sm' />)

    expect(wrapper.prop('className')).toContain('c-Card__block--sm')
  })

  test('Renders bgMuted styles, if specified', () => {
    const wrapper = shallow(<CardBlock bgMuted />)

    expect(wrapper.hasClass('is-bg-muted')).toBeTruthy()
  })

  test('Renders flex styles, if specified', () => {
    const wrapper = shallow(<CardBlock flex />)

    expect(wrapper.hasClass('is-flex')).toBeTruthy()
  })
})
