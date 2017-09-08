import React from 'react'
import { mount, shallow } from 'enzyme'
import CardBlock from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<CardBlock />)

    expect(wrapper.prop('className')).toBe('c-card__block')
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

describe('Styles', () => {
  test('Does not have a size modifier style by default', () => {
    const wrapper = shallow(<CardBlock />)
    const classNames = wrapper.prop('className')

    expect(classNames).not.toContain('c-card__block--sm')
    expect(classNames).not.toContain('c-card__block--md')
    expect(classNames).not.toContain('c-card__block--lg')
  })

  test('Renders size styles, if specified', () => {
    const wrapper = shallow(<CardBlock size='sm' />)

    expect(wrapper.prop('className')).toContain('c-card__block--sm')
  })
})
