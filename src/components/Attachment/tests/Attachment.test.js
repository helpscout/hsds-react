import React from 'react'
import { mount, shallow } from 'enzyme'
import Attachment from '../index'

const ui = {
  name: '.c-Attachment__name',
  size: '.c-Attachment__size'
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Attachment />)

    expect(wrapper.hasClass('c-Attachment')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Attachment className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Custom attributes', () => {
  test('Can render custom HTML attributes', () => {
    const wrapper = shallow(<Attachment data-tie='piano-key' />)
    const html = wrapper.html()

    expect(html).toContain('data-tie')
    expect(html).toContain('piano-key')
  })
})

describe('Children', () => {
  test('Does not render child content', () => {
    const wrapper = shallow(
      <Attachment>
        <div className='child'>Hello</div>
      </Attachment>
    )
    const o = wrapper.find('div.child')

    expect(o.length).toBeFalsy()
  })
})

describe('Events', () => {
  test('onClick callback still fires', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Attachment onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onClick callback provides Attachment prop data', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Attachment name='file.png' onClick={spy} />)

    wrapper.simulate('click')
    const callbackData = spy.mock.calls[0][1]

    expect(typeof callbackData).toBe('object')
    expect(callbackData.name).toBe('file.png')
  })
})

describe('Size', () => {
  test('Does not render by default', () => {
    const wrapper = shallow(<Attachment />)
    const o = wrapper.find(ui.size)

    expect(o.length).toBe(0)
  })

  test('Renders if size is provided', () => {
    const size = '5KB'
    const wrapper = mount(<Attachment size={size} />)
    const o = wrapper.find(ui.size)

    expect(o.length).toBe(1)
    expect(o.text()).toBe(size)
  })
})

describe('TruncateLimit', () => {
  test('Can provide custom truncate limit', () => {
    const name = 'mr-mr-mr-mugatu.png'
    const wrapper = mount(
      <Attachment truncateLimit={10} name='mr-mr-mr-mugatu.png' />
    )
    const o = wrapper.find(ui.name)
    const t = o.text()

    expect(t).not.toBe(name)
    expect(t.length).toBeLessThan(name.length)
    expect(t).toContain('.png')
  })

  test('Does not truncate with a higher truncate limit', () => {
    const name = 'mr-mr-mr-mugatu.png'
    const wrapper = mount(
      <Attachment truncateLimit={100} name='mr-mr-mr-mugatu.png' />
    )
    const o = wrapper.find(ui.name)
    const t = o.text()

    expect(t).toBe(name)
  })
})

describe('Type', () => {
  test('Renders type-based style', () => {
    const wrapper = shallow(<Attachment type='action' />)

    expect(wrapper.hasClass('is-action')).toBeTruthy()
    wrapper.setProps({type: 'link'})
    expect(wrapper.hasClass('is-action')).toBeFalsy()
    expect(wrapper.hasClass('is-link')).toBeTruthy()
  })
})
