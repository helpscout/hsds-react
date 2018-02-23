import React from 'react'
import { mount, shallow } from 'enzyme'
import LineItem from '../LineItem'

const ui = {
  content: '.c-ChatTranscriptLineItem__content',
  createdAt: '.c-ChatTranscriptLineItem__createdAt',
  timestamp: '.c-ChatTranscriptLineItem__timestamp'
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<LineItem />)

    expect(wrapper.hasClass('c-ChatTranscriptLineItem')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<LineItem className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<LineItem><div className='child'>Hello</div></LineItem>)
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('CreatedAt', () => {
  test('Does not render by default', () => {
    const wrapper = mount(
      <LineItem />
    )
    const o = wrapper.find(ui.createdAt)

    expect(o.length).toBe(0)
  })

  test('Renders createdAt, if provided', () => {
    const props = {
      createdAt: '9:41pm'
    }
    const wrapper = mount(
      <LineItem {...props} />
    )
    const o = wrapper.find(ui.createdAt)

    expect(o.length).toBe(1)
    expect(o.html()).toContain(props.createdAt)
  })

  test('Adds timestamp as a title/tooltip, if provided', () => {
    const props = {
      createdAt: '9:41pm',
      timestamp: 'some time'
    }
    const wrapper = mount(
      <LineItem {...props} />
    )
    const o = wrapper.find(ui.createdAt)
    const t = o.find(ui.timestamp)

    expect(t.length).toBe(1)
    expect(t.prop('title')).toBe(props.timestamp)
  })
})
