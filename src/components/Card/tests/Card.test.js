import React from 'react'
import { mount, shallow } from 'enzyme'
import Card from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Card />)

    expect(wrapper.prop('className')).toBe('c-Card')
  })

  test('Accepts custom className', () => {
    const wrapper = shallow(<Card className='not-metro-man' />)

    expect(wrapper.prop('className')).toContain('not-metro-man')
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Card>Megamind</Card>)

    expect(wrapper.text()).toBe('Megamind')
  })

  test('Render child components', () => {
    const wrapper = mount(
      <Card className='mega'>
        <Card className='mind'>
          Megamind
        </Card>
      </Card>
    )

    const innerCard = wrapper.childAt(0)

    expect(innerCard.exists()).toBeTruthy()
    expect(innerCard.prop('className')).toContain('mind')
    expect(innerCard.text()).toBe('Megamind')
  })
})

describe('Link', () => {
  const link = 'https://www.helpscout.net'

  test('Renders an `a` selector if href is specified', () => {
    const wrapper = shallow(<Card href={link} />)

    expect(wrapper.node.type).toBe('a')
    expect(wrapper.prop('href')).toBe(link)
  })

  test('Adds link styles if href is specified', () => {
    const wrapper = shallow(<Card href={link} />)

    expect(wrapper.prop('className')).toContain('is-clickable')
    expect(wrapper.prop('className')).toContain('is-hoverable')
  })
})

describe('Click', () => {
  test('Can trigger onClick callback', () => {
    let value = false
    const onClick = () => { value = true }
    const wrapper = shallow(<Card onClick={onClick} />)

    wrapper.simulate('click')

    expect(value).toBeTruthy()
  })

  test('Adds clickable styles if onClick is specified', () => {
    const noop = () => {}
    const wrapper = shallow(<Card onClick={noop} />)

    expect(wrapper.prop('className')).toContain('is-clickable')
  })
})

describe('Selector', () => {
  test('Renders a div selector by default', () => {
    const wrapper = shallow(<Card />)

    expect(wrapper.node.type).toBe('div')
  })

  test('Renders a custom selector, if specified', () => {
    const wrapper = shallow(<Card selector='span' />)

    expect(wrapper.node.type).toBe('span')
  })
})

describe('Styles', () => {
  test('Renders seamless styles, if specified', () => {
    const wrapper = shallow(<Card seamless />)

    expect(wrapper.prop('className')).toContain('is-seamless')
  })
})
