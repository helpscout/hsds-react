import React from 'react'
import { mount } from 'enzyme'
import { List } from '../List'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<List />)
    const el = wrapper.find('ul.c-List')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<List className={customClass} />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <List>
        <div className="child">Hello</div>
      </List>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Defaults', () => {
  test('Renders a ul by default', () => {
    const wrapper = mount(<List />)
    const el = wrapper.find('ul')

    expect(el.length).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has an aria-role by default', () => {
    const wrapper = mount(<List />)

    expect(wrapper.find('ul').props().role).toBe('list')
  })

  test('Role can be overridden', () => {
    const wrapper = mount(<List role="listbox" />)

    expect(wrapper.find('ul').props().role).toBe('listbox')
  })
})

describe('Border', () => {
  test('Does not render a border style by default', () => {
    const wrapper = mount(<List />)

    expect(wrapper.props().border).toBeFalsy()
    expect(wrapper.hasClass('is-bordered')).not.toBeTruthy()
    expect(wrapper.hasClass('is-dotted')).not.toBeTruthy()
  })

  test('Can render dot borders', () => {
    const wrapper = mount(<List border="dot" />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass('is-dotted')).toBeTruthy()
  })

  test('Can render line borders', () => {
    const wrapper = mount(<List border="line" />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass('is-bordered')).toBeTruthy()
  })
})

describe('Bullet', () => {
  test('Renders a ul if type is "bullet"', () => {
    const wrapper = mount(<List type="bullet" />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass('is-bullet')).toBeTruthy()
  })
})

describe('Inline', () => {
  test('Renders a ul if type is "inline"', () => {
    const wrapper = mount(<List type="inline" />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass('is-inline')).toBeTruthy()
  })
})

describe('InlineSize', () => {
  test('Renders an inlineSize style, if defined', () => {
    const wrapper = mount(<List inlineSize="xs" />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass('is-inline-xs')).toBeTruthy()
  })
})

describe('Number', () => {
  test('Renders a ol if type is "number"', () => {
    const wrapper = mount(<List type="number" />)
    const el = wrapper.find('ol.c-List')

    expect(el.hasClass('is-number')).toBeTruthy()
  })
})

describe('Display', () => {
  test('Is display block by default', () => {
    const wrapper = mount(<List />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass('is-display-block')).toBeTruthy()
  })

  test('Can be set to display flex', () => {
    const wrapper = mount(<List display="flex" />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass('is-display-block')).not.toBeTruthy()
    expect(el.hasClass('is-display-flex')).toBeTruthy()
  })
})

describe('Size', () => {
  test('Can render size styles, if specified', () => {
    const wrapper = mount(<List size="md" />)
    const el = wrapper.find('ul.c-List')

    expect(el.hasClass('is-md')).toBeTruthy()
  })
})
