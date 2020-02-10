import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import Bubble from '../Message.Bubble'
import Message from '../Message'
import { TypingDots, Text } from '../../index'

const cx = 'c-MessageBubble'
const ui = {
  body: `.${cx}__body`,
  bodyWrapper: `.${cx}__bodyWrapper`,
  from: `.${cx}__from`,
  iconWrapper: `.${cx}__iconWrapper`,
  icon: `.${cx}__icon`,
  title: `.${cx}__title`,
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Bubble />)
    const el = wrapper.find('div.c-MessageBubble')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Bubble className={customClass} />)
    const el = wrapper.find('div.c-MessageBubble')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Bubble>
        <div className="child">Hello</div>
      </Bubble>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Title', () => {
  test('Does not render a Title by default', () => {
    const wrapper = mount(<Bubble />)
    const o = wrapper.find(ui.title)

    expect(o.length).toBe(0)
  })

  test('Renders a Title if defined', () => {
    const wrapper = mount(<Bubble title="Mugatu" primary />)
    const o = wrapper.find(ui.title).first()

    expect(o.length).toBeTruthy()
    expect(
      o.getDOMNode().classList.contains('c-MessageBubble__title')
    ).toBeTruthy()
    expect(o.text()).toContain('Mugatu')
  })
})

describe('Typing', () => {
  test('Does not render a TypingDots by default', () => {
    const wrapper = mount(<Bubble />)
    const o = wrapper.find(TypingDots)

    expect(o.length).toBe(0)
  })

  test('Renders TypingDots if typing', () => {
    const wrapper = mount(<Bubble typing />)
    const o = wrapper.find(TypingDots)

    expect(o.length).toBe(1)
  })

  test('Renders TypingDots instead of children if typing', () => {
    const wrapper = mount(<Bubble typing>Mugatu</Bubble>)
    const o = wrapper.find(TypingDots)

    expect(o.length).toBe(1)
    expect(o.html()).not.toContain('Mugatu')
  })
})

describe('Content', () => {
  test('Text-based content is contained with a wordWrapped Text component', () => {
    const wrapper = mount(<Bubble>Mugatu</Bubble>)
    const o = wrapper.find(Text).first()

    expect(o.length).toBe(1)
    expect(o.instance().props.wordWrap).toBeTruthy()
    expect(o.instance().props.children).toBe('Mugatu')
  })

  test('Span-based content is contained with a wordWrapped Text component', () => {
    const wrapper = mount(
      <Bubble>
        <span>Mugatu</span>
      </Bubble>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Mugatu')
  })

  test('Block-based content is not contained with a Text component', () => {
    const wrapper = mount(
      <Bubble>
        <div>Mugatu</div>
      </Bubble>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBe(0)
    expect(wrapper.html()).toContain('Mugatu')
  })

  test('Renders body if defined', () => {
    const wrapper = mount(<Bubble body="Mugatu" />)
    const o = wrapper.find(ui.body).first()

    expect(o.length).toBe(1)
    expect(wrapper.html()).toContain('Mugatu')
  })

  test('Renders body instead of children, if defined', () => {
    const wrapper = mount(<Bubble body="Mugatu">Zoolander</Bubble>)
    const o = wrapper.find(ui.body).first()

    expect(o.length).toBe(1)
    expect(wrapper.html()).toContain('Mugatu')
    expect(wrapper.html()).not.toContain('Zoolander')
  })

  test('Renders body with autolinked URLs', () => {
    const body = 'www.helpscout.com'
    const wrapper = mount(<Bubble body={body} />)
    const o = wrapper.find(ui.body).first()

    expect(o.length).toBe(1)
    expect(wrapper.html()).toContain('<a href="http://www.helpscout.com"')
  })

  test('Converts newlines to line break elements', () => {
    const body = 'Hello\n\nGoodbye'
    const wrapper = mount(<Bubble body={body} />)
    const o = wrapper.find(ui.body).first()

    expect(o.length).toBe(1)
    expect(wrapper.html()).toContain('Hello<br><br>Goodbye')
  })

  test('Escapes HTML in the body', () => {
    const html = '<div>Mugatu</div>'
    const wrapper = mount(<Bubble body={html} />)
    const o = wrapper.find(ui.body).first()
    const parsedHTML = '&lt;div&gt;Mugatu&lt;/div&gt;'

    expect(o.length).toBe(1)
    expect(wrapper.html()).toContain(parsedHTML)
  })
})

describe('Styles', () => {
  test('Applies "from" styles, if defined', () => {
    const wrapper = mount(<Bubble from />)

    expect(wrapper.getDOMNode().classList.contains('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = mount(<Bubble to />)

    expect(wrapper.getDOMNode().classList.contains('is-to')).toBeTruthy()
  })

  test('Applies "note" styles, if defined', () => {
    const wrapper = mount(<Bubble isNote />)

    expect(wrapper.getDOMNode().classList.contains('is-note')).toBeTruthy()
  })

  test('Applies "primary" styles, if defined', () => {
    const wrapper = mount(<Bubble primary />)

    expect(wrapper.getDOMNode().classList.contains('is-primary')).toBeTruthy()
  })

  test('Applies "size" styles, if defined', () => {
    const wrapper = mount(<Bubble size="sm" />)

    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBeTruthy()
  })

  test('Applies "ltr" styles, if defined', () => {
    const wrapper = mount(<Bubble ltr />)

    expect(wrapper.getDOMNode().classList.contains('is-ltr')).toBeTruthy()
  })

  test('Applies "rtl" styles, if defined', () => {
    const wrapper = mount(<Bubble rtl />)

    expect(wrapper.getDOMNode().classList.contains('is-rtl')).toBeTruthy()
  })

  test('Applies "typing" styles, if defined', () => {
    const wrapper = mount(<Bubble typing />)

    expect(wrapper.getDOMNode().classList.contains('is-typing')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Bubble />
      </Message.Provider>
    )
    const el = wrapper.find(Bubble)

    expect(el.getDOMNode().classList.contains('is-theme-embed')).toBe(true)
  })
})

describe('From', () => {
  test('It does not render a from name, by default', () => {
    const wrapper = mount(<Bubble from="Mugatu" />)
    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Does not render from name, if theme is notifications, but from is not provided', () => {
    const wrapper = mount(
      <Message.Provider theme="notifications">
        <Bubble />
      </Message.Provider>
    )
    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Does not renders from name, if theme is notifications and from is not a string', () => {
    const wrapper = mount(
      <Message.Provider theme="notifications">
        <Bubble from />
      </Message.Provider>
    )
    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Renders from name, if theme is notifications and from is a string', () => {
    const wrapper = mount(
      <Message.Provider theme="notifications">
        <Bubble from="Mugatu" />
      </Message.Provider>
    )
    const o = wrapper.find(ui.from).first()

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Mugatu')
  })
})

describe('Icon', () => {
  test('Does not render an icon by default', () => {
    const wrapper = mount(<Bubble body="derek" />)
    const o = wrapper.find(ui.icon)
    const w = wrapper.find(ui.iconWrapper)

    expect(o.length).toBe(0)
    expect(w.length).toBe(0)
  })

  test('Renders an icon, if specified', () => {
    const wrapper = mount(<Bubble body="derek" icon="attachment" />)
    const o = wrapper.find(ui.icon).first()
    const w = wrapper.find(ui.iconWrapper).first()

    expect(o.length).toBe(1)
    expect(w.length).toBe(1)
    expect(o.getDOMNode().classList.contains('is-iconName-attachment')).toBe(
      true
    )
  })
})
