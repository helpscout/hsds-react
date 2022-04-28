import React from 'react'
import { mount, shallow, render } from 'enzyme'
import { Attachment } from './Attachment'
import { Provider } from './index'

const ui = {
  content: '.c-Attachment__content',
  closeButton: '.c-Attachment__closeButton',
  image: '.c-Attachment__image',
  name: '.c-Attachment__name',
  size: '.c-Attachment__size',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Attachment />)

    expect(wrapper.hasClass('c-Attachment')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Attachment className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBeTruthy()
  })
})

describe('Custom attributes', () => {
  test('Can render custom HTML attributes', () => {
    const wrapper = shallow(<Attachment data-tie="piano-key" />)
    const html = wrapper.html()

    expect(html).toContain('data-tie')
    expect(html).toContain('piano-key')
  })
})

describe('Children', () => {
  test('Does not render child content', () => {
    const wrapper = shallow(
      <Attachment>
        <div className="child">Hello</div>
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
    const wrapper = shallow(<Attachment name="file.png" onClick={spy} />)

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
    const o = wrapper.find(`span${ui.size}`)

    expect(o.text()).toBe(size)
  })
})

describe('TruncateLimit', () => {
  test('Can provide custom truncate limit', () => {
    const name = 'mr-mr-mr-mugatu.png'
    const wrapper = mount(
      <Attachment truncateLimit={10} name="mr-mr-mr-mugatu.png" />
    )
    const o = wrapper.find(`span${ui.name}`)
    const t = o.text()

    expect(t).not.toBe(name)
    expect(t.length).toBeLessThan(name.length)
    expect(t).toContain('.png')
  })

  test('Does not truncate with a higher truncate limit', () => {
    const name = 'mr-mr-mr-mugatu.png'
    const wrapper = mount(
      <Attachment truncateLimit={100} name="mr-mr-mr-mugatu.png" />
    )
    const o = wrapper.find(`span${ui.name}`)
    const t = o.text()

    expect(t).toBe(name)
  })
})

describe('Type', () => {
  test('Renders type-based style', () => {
    const wrapper = shallow(<Attachment type="action" />)

    expect(wrapper.hasClass('is-action')).toBeTruthy()
    wrapper.setProps({ type: 'link' })
    expect(wrapper.hasClass('is-action')).toBeFalsy()
    expect(wrapper.hasClass('is-link')).toBeTruthy()
  })
})

describe('Theme', () => {
  test('Renders default theme styles, if wrapped in Provider', () => {
    const wrapper = mount(
      <Provider>
        <Attachment type="action" />
      </Provider>
    )
    const o = wrapper.find('a.c-Attachment')

    expect(o.length).toBe(1)
    expect(o.hasClass('is-theme-default')).toBeTruthy()
  })

  test('Renders theme styles, if provided', () => {
    const wrapper = mount(
      <Provider theme="preview">
        <Attachment type="action" />
      </Provider>
    )
    const o = wrapper.find('a.c-Attachment')

    expect(o.length).toBe(1)
    expect(o.hasClass('is-theme-preview')).toBeTruthy()
  })
})

describe('Image', () => {
  test('Adds image className if image is provided', () => {
    const wrapper = mount(<Attachment imageUrl="image.png" />)
    const o = wrapper.find('a.c-Attachment')

    expect(o.hasClass('has-image')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Renders text within content block, by default', () => {
    const wrapper = shallow(
      <Attachment truncateLimit={10} name="mr-mr-mr-mugatu.png" />
    )
    const o = wrapper.find(ui.content)
    const n = o.find(ui.name)
    const i = o.find(ui.image)

    expect(o.length).toBe(1)
    expect(n.length).toBe(1)
    expect(i.length).toBe(0)
  })

  test('Renders image within content block, if defined', () => {
    const wrapper = shallow(<Attachment imageUrl="image.png" />)
    const o = wrapper.find(ui.content)
    const n = o.find(ui.name)
    const i = o.find(ui.image)

    expect(o.length).toBe(1)
    expect(n.length).toBe(0)
    expect(i.length).toBe(1)
  })

  test('Renders provided custom content', () => {
    const wrapper = shallow(
      <Attachment
        name="custom content"
        content={<strong>My custom content</strong>}
      />
    )
    const contentWrapper = wrapper.find(ui.content)
    const customContent = contentWrapper.find('strong')
    const name = contentWrapper.find(ui.name)
    const image = contentWrapper.find(ui.image)

    expect(contentWrapper.length).toBe(1)
    expect(customContent.length).toBe(1)
    expect(name.length).toBe(0)
    expect(image.length).toBe(0)
  })
})

describe('CloseButton', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Attachment imageUrl="image.png" />)
    const o = wrapper.find(`button${ui.closeButton}`)

    expect(o.length).toBe(0)
  })

  test('Renders if the theme is preview', () => {
    const wrapper = mount(
      <Provider theme="preview">
        <Attachment imageUrl="image.png" />
      </Provider>
    )
    const o = wrapper.find(`button${ui.closeButton}`)

    expect(o.length).toBe(1)
  })

  test('onRemoveClick callback fires when clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Provider theme="preview">
        <Attachment imageUrl="image.png" onRemoveClick={spy} id="1" />
      </Provider>
    )
    const o = wrapper.find(`button${ui.closeButton}`)

    o.simulate('click')

    expect(o.length).toBe(1)
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][1].id).toBe('1')
  })
})

describe('Download', () => {
  test('Autofills download attributes if url is provided', () => {
    const wrapper = shallow(<Attachment url="file.pdf" />)

    expect(wrapper.prop('download')).toBe(true)
    expect(wrapper.prop('target')).toBe('_blank')
  })

  test('Does not provide valid download attributes if url is not provided', () => {
    const wrapper = shallow(<Attachment />)

    expect(wrapper.prop('download')).toBeFalsy()
    expect(wrapper.prop('target')).toBeFalsy()
  })

  test('Does not swallow props.download if url is provided', () => {
    const wrapper = shallow(<Attachment url="file.pdf" download={false} />)

    expect(wrapper.prop('download')).toBe(false)
  })

  test('Does not swallow props.target if url is provided', () => {
    const wrapper = shallow(<Attachment url="file.pdf" target="_self" />)

    expect(wrapper.prop('target')).toBe('_self')
  })
})

describe('State', () => {
  test('Renders state className', () => {
    const wrapper = render(<Attachment url="file.pdf" state="error" />)

    expect(wrapper.hasClass('is-error')).toBeTruthy()
  })

  test('Renders state UI', () => {
    const wrapper = render(<Attachment url="file.pdf" state="error" />)
    const el = wrapper.find('.c-Attachment__errorBorder')

    expect(el.length).toBeTruthy()
  })
})
