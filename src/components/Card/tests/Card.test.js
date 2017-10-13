import React from 'react'
import { mount, shallow } from 'enzyme'
import Card from '..'
import Link from '../../Link'

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

describe('Block', () => {
  test('Does not render a Card.Block by default', () => {
    const wrapper = shallow(<Card />)
    const o = wrapper.find(Card.Block)

    expect(o.length).toBeFalsy()
  })

  test('Can render a Card.Block', () => {
    const wrapper = shallow(
      <Card>
        <Card.Block>
          MegaMind
        </Card.Block>
      </Card>
      )
    const o = wrapper.find(Card.Block)

    expect(o.length).toBe(1)
    expect(o.node.props.children).toBe('MegaMind')
  })

  test('Can render a multiple Card.Block', () => {
    const wrapper = shallow(
      <Card>
        <Card.Block>
          Mega
        </Card.Block>
        <Card.Block>
          Mind
        </Card.Block>
      </Card>
      )
    const o = wrapper.find(Card.Block)

    expect(o.length).toBe(2)
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

  test('Adds link styles if href is specified', () => {
    const wrapper = shallow(<Card href={link} />)

    expect(wrapper.prop('className')).toContain('is-clickable')
    expect(wrapper.prop('className')).toContain('is-hoverable')
  })

  test('Renders a Link component if href is defined', () => {
    const wrapper = shallow(<Card href={link} />)
    const o = wrapper.find(Link)

    expect(o.length).toBe(1)
    expect(o.node.props.block).toBeTruthy()
    expect(o.node.props.href).toBe(link)
  })

  test('Renders a Link component if to is defined', () => {
    const wrapper = shallow(<Card to={link} />)
    const o = wrapper.find(Link)

    expect(o.length).toBe(1)
    expect(o.node.props.block).toBeTruthy()
    expect(o.node.props.to).toBe(link)
  })

  test('Renders a Link component with target="_blank"', () => {
    const wrapper = shallow(<Card href={link} external />)
    const o = wrapper.find(Link)
    const p = o.node.props

    expect(o.length).toBe(1)
    expect(p.block).toBeTruthy()
    expect(p.href).toBe(link)
    expect(p.external).toBeTruthy()
    expect(o.html()).toContain('_blank')
  })

  test('Renders a Link, with a Card.Block child', () => {
    const wrapper = shallow(
      <Card href={link}>
        <Card.Block>MegaMind</Card.Block>
      </Card>
    )
    const b = wrapper.find(Card.Block)
    const o = wrapper.find(Link)

    expect(o.length).toBe(1)
    expect(o.node.props.children.type).toBe(Card.Block)
    expect(b.length).toBe(1)
    expect(b.node.props.children).toBe('MegaMind')
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
  test('Renders borderless styles, if specified', () => {
    const wrapper = shallow(<Card borderless />)

    expect(wrapper.hasClass('is-borderless')).toBeTruthy()
  })

  test('Renders flex styles, if specified', () => {
    const wrapper = shallow(<Card flex />)

    expect(wrapper.hasClass('is-flex')).toBeTruthy()
  })

  test('Renders floating styles, if specified', () => {
    const wrapper = shallow(<Card floating />)

    expect(wrapper.hasClass('is-floating')).toBeTruthy()
  })

  test('Renders seamless styles, if specified', () => {
    const wrapper = shallow(<Card seamless />)

    expect(wrapper.hasClass('is-seamless')).toBeTruthy()
  })
})
