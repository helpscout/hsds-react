import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import Card from '../Card'
import Link from '../../Link'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Card />)
    const el = wrapper.find('div.c-Card')

    expect(el.hasClass('c-Card')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Card className="not-metro-man" />)
    const el = wrapper.find('div.c-Card')

    expect(el.prop('className')).toContain('not-metro-man')
  })
})

describe('Block', () => {
  test('Does not render a Card.Block by default', () => {
    const wrapper = mount(<Card />)
    const o = wrapper.find(Card.Block)

    expect(o.length).toBeFalsy()
  })

  test('Can render a Card.Block', () => {
    const wrapper = mount(
      <Card>
        <Card.Block>MegaMind</Card.Block>
      </Card>
    )
    const o = wrapper.find(Card.Block)

    expect(o.length).toBe(1)
    expect(o.text()).toContain('MegaMind')
  })

  test('Can render a multiple Card.Block', () => {
    const wrapper = mount(
      <Card>
        <Card.Block>Mega</Card.Block>
        <Card.Block>Mind</Card.Block>
      </Card>
    )
    const o = wrapper.find(Card.Block)

    expect(o.length).toBe(2)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<Card>Megamind</Card>)

    expect(wrapper.text()).toBe('Megamind')
  })

  test('Render child components', () => {
    const wrapper = mount(
      <Card className="mega">
        <Card className="mind">Megamind</Card>
      </Card>
    )

    const innerCard = wrapper.find('div.mind')

    expect(innerCard.exists()).toBeTruthy()
    expect(innerCard.text()).toContain('Megamind')
  })
})

describe('Link', () => {
  const link = 'https://www.helpscout.net'

  test('Adds link styles if href is specified', () => {
    const wrapper = mount(<Card href={link} />)
    const el = wrapper.find('a.c-Card')

    expect(el.hasClass('is-clickable')).toBe(true)
    expect(el.hasClass('is-hoverable')).toBe(true)
  })

  test('Renders a Link component if href is defined', () => {
    const wrapper = mount(<Card href={link} />)
    const o = wrapper.find(Link)

    expect(o.length).toBe(1)
    expect(o.getElement().props.href).toBe(link)
  })

  test('Renders a Link component if to is defined', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Card to={link} />
      </MemoryRouter>
    )
    const o = wrapper.find(Link)

    expect(o.length).toBe(1)
    expect(o.getElement().props.block).toBeTruthy()
    expect(o.getElement().props.to).toBe(link)
  })

  test('Renders a Link component with target="_blank"', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Card href={link} external />
      </MemoryRouter>
    )
    const o = wrapper.find(Link)
    const p = o.getElement().props

    expect(o.length).toBe(1)
    expect(p.block).toBeTruthy()
    expect(p.href).toBe(link)
    expect(o.html()).toContain('_blank')
  })

  test('Renders a Link, with a Card.Block child', () => {
    const wrapper = mount(
      <Card href={link}>
        <Card.Block>MegaMind</Card.Block>
      </Card>
    )
    const b = wrapper.find(Card.Block)
    const o = wrapper.find(Link)

    expect(o.length).toBe(1)
    expect(o.getElement().props.children.type).toBe(Card.Block)
    expect(b.length).toBe(1)
    expect(b.getElement().props.children).toBe('MegaMind')
  })

  test('onBlur fires for a Link', () => {
    const spy = jest.fn()
    const wrapper = mount(<Card href={link} onBlur={spy} />)
    wrapper.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('onClick fires for a Link', () => {
    const spy = jest.fn()
    const wrapper = mount(<Card href={link} onClick={spy} />)
    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus fires for a Link', () => {
    const spy = jest.fn()
    const wrapper = mount(<Card href={link} onFocus={spy} />)
    wrapper.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })

  test('Does not pass autoWordWrap prop to div', () => {
    const wrapper = mount(<Card autoWordWrap />)
    const o = wrapper.find('.c-Card')

    expect(o.props().autoWordWrap).toBeFalsy()
  })

  test('Can pass autoWordWrap to Link', () => {
    const wrapper = mount(<Card href={link} autoWordWrap />)
    const o = wrapper.find(Link)

    expect(o.props().autoWordWrap).toBeTruthy()
  })
})

describe('Click', () => {
  test('Can trigger onClick callback', () => {
    let value = false
    const onClick = () => {
      value = true
    }
    const wrapper = mount(<Card onClick={onClick} />)

    wrapper.simulate('click')

    expect(value).toBeTruthy()
  })

  test('Adds clickable styles if onClick is specified', () => {
    const noop = () => {}
    const wrapper = mount(<Card onClick={noop} />)

    expect(wrapper.getDOMNode().classList.contains('is-clickable')).toBe(true)
  })
})

describe('Selector', () => {
  test('Renders a div selector by default', () => {
    const wrapper = mount(<Card />)
    const o = wrapper.find('.c-Card').first()

    expect(o.getDOMNode().tagName).toBe('DIV')
  })

  test('Renders a custom selector, if specified', () => {
    const wrapper = mount(<Card selector="span" />)
    const o = wrapper.find('.c-Card').first()

    expect(o.getDOMNode().tagName).toBe('SPAN')
  })
})

describe('Styles', () => {
  test('Renders borderless styles, if specified', () => {
    const wrapper = mount(<Card borderless />)

    expect(
      wrapper.getDOMNode().classList.contains('is-borderless')
    ).toBeTruthy()
  })

  test('Renders flex styles, if specified', () => {
    const wrapper = mount(<Card flex />)

    expect(wrapper.getDOMNode().classList.contains('is-flex')).toBeTruthy()
  })

  test('Renders fullHeight styles, if specified', () => {
    const wrapper = mount(<Card fullHeight />)

    expect(
      wrapper.getDOMNode().classList.contains('is-fullHeight')
    ).toBeTruthy()
  })

  test('Renders floating styles, if specified', () => {
    const wrapper = mount(<Card floating />)

    expect(wrapper.getDOMNode().classList.contains('is-floating')).toBeTruthy()
  })

  test('Renders seamless styles, if specified', () => {
    const wrapper = mount(<Card seamless />)

    expect(wrapper.getDOMNode().classList.contains('is-seamless')).toBeTruthy()
  })
})
