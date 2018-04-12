import React from 'react'
import { mount, shallow } from 'enzyme'
import Attachment from '../index'

const ui = {
  content: '.c-Attachment__content',
  closeButton: '.c-Attachment__closeButton',
  image: '.c-Attachment__image',
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

describe('Theme', () => {
  test('Renders default theme styles, if wrapped in Provider', () => {
    const wrapper = mount(
      <Attachment.Provider>
        <Attachment type='action' />
      </Attachment.Provider>
    )
    const o = wrapper.find(Attachment)

    expect(o.length).toBe(1)
    expect(o.hasClass('is-theme-default')).toBeTruthy()
  })

  test('Renders theme styles, if provided', () => {
    const wrapper = mount(
      <Attachment.Provider theme='preview'>
        <Attachment type='action' />
      </Attachment.Provider>
    )
    const o = wrapper.find(Attachment)

    expect(o.length).toBe(1)
    expect(o.hasClass('is-theme-preview')).toBeTruthy()
  })
})

describe('Image', () => {
  test('Adds image className if image is provided', () => {
    const wrapper = mount(
      <Attachment imageUrl='image.png' />
    )

    expect(wrapper.hasClass('has-image')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Renders text within content block, by default', () => {
    const wrapper = shallow(
      <Attachment truncateLimit={10} name='mr-mr-mr-mugatu.png' />
    )
    const o = wrapper.find(ui.content)
    const n = o.find(ui.name)
    const i = o.find(ui.image)

    expect(o.length).toBe(1)
    expect(n.length).toBe(1)
    expect(i.length).toBe(0)
  })

  test('Renders image within content block, if defined', () => {
    const wrapper = shallow(
      <Attachment imageUrl='image.png' />
    )
    const o = wrapper.find(ui.content)
    const n = o.find(ui.name)
    const i = o.find(ui.image)

    expect(o.length).toBe(1)
    expect(n.length).toBe(0)
    expect(i.length).toBe(1)
  })
})

describe('CloseButton', () => {
  test('Does not render by default', () => {
    const wrapper = mount(
      <Attachment imageUrl='image.png' />
    )
    const o = wrapper.find(ui.closeButton)

    expect(o.length).toBe(0)
  })

  test('Renders if the theme is preview', () => {
    const wrapper = mount(
      <Attachment.Provider theme='preview'>
        <Attachment imageUrl='image.png' />
      </Attachment.Provider>
    )
    const o = wrapper.find(ui.closeButton)

    expect(o.length).toBe(1)
  })

  test('onRemoveClick callback fires when clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Attachment.Provider theme='preview'>
        <Attachment imageUrl='image.png' onRemoveClick={spy} id='1' />
      </Attachment.Provider>
    )
    const o = wrapper.find(ui.closeButton)

    o.simulate('click')

    expect(o.length).toBe(1)
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][1].id).toBe('1')
  })
})

describe('Download', () => {
  test('Autofills download attributes if url is provided', () => {
    const wrapper = shallow(<Attachment url='file.pdf' />)
    const link = wrapper.find('a')

    expect(link.prop('download')).toBe(true)
    expect(link.prop('target')).toBe('_blank')
  })

  test('Does not provide valid download attributes if url is not provided', () => {
    const wrapper = shallow(<Attachment />)
    const link = wrapper.find('a')

    expect(link.prop('download')).toBeFalsy()
    expect(link.prop('target')).toBeFalsy()
  })

  test('Does not swallow props.download if url is provided', () => {
    const wrapper = shallow(<Attachment url='file.pdf' download={false} />)
    const link = wrapper.find('a')

    expect(link.prop('download')).toBe(false)
  })

  test('Does not swallow props.target if url is provided', () => {
    const wrapper = shallow(<Attachment url='file.pdf' target='_self' />)
    const link = wrapper.find('a')

    expect(link.prop('target')).toBe('_self')
  })
})
