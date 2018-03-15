import React from 'react'
import { mount, shallow } from 'enzyme'
import Bubble from '../Bubble'
import Message from '../Message'
import { Heading, LoadingDots, Text } from '../../'
import { baseComponentTest } from '../../../tests/helpers/components'

const cx = 'c-MessageBubble'
const baseComponentOptions = {
  className: cx
}
const ui = {
  body: `.${cx}__body`,
  bodyWrapper: `.${cx}__bodyWrapper`,
  from: `.${cx}__from`,
  iconWrapper: `.${cx}__iconWrapper`,
  icon: `.${cx}__icon`
}

baseComponentTest(Bubble, baseComponentOptions)

describe('Title', () => {
  test('Does not render a Title by default', () => {
    const wrapper = shallow(<Bubble />)
    const o = wrapper.find(Heading)

    expect(o.length).toBe(0)
  })

  test('Renders a Title if defined', () => {
    const wrapper = shallow(<Bubble title='Mugatu' primary />)
    const o = wrapper.find(Heading)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-MessageBubble__title')).toBeTruthy()
    expect(o.node.props.children).toContain('Mugatu')
  })
})

describe('Typing', () => {
  test('Does not render a LoadingDots by default', () => {
    const wrapper = shallow(<Bubble />)
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(0)
  })

  test('Renders LoadingDots if typing', () => {
    const wrapper = shallow(<Bubble typing />)
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(1)
  })

  test('Renders LoadingDots instead of children if typing', () => {
    const wrapper = shallow(<Bubble typing>Mugatu</Bubble>)
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(1)
    expect(o.html()).not.toContain('Mugatu')
  })
})

describe('Content', () => {
  test('Text-based content is contained with a wordWrapped Text component', () => {
    const wrapper = shallow(
      <Bubble>
        Mugatu
      </Bubble>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBe(1)
    expect(o.node.props.wordWrap).toBeTruthy()
    expect(o.node.props.children).toBe('Mugatu')
  })

  test('Span-based content is contained with a wordWrapped Text component', () => {
    const wrapper = shallow(
      <Bubble>
        <span>
          Mugatu
        </span>
      </Bubble>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Mugatu')
  })

  test('Block-based content is not contained with a Text component', () => {
    const wrapper = shallow(
      <Bubble>
        <div>
          Mugatu
        </div>
      </Bubble>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBe(0)
    expect(wrapper.html()).toContain('Mugatu')
  })

  test('Renders body if defined', () => {
    const wrapper = shallow(
      <Bubble body='Mugatu' />
    )
    const o = wrapper.find(ui.body)

    expect(o.length).toBe(1)
    expect(wrapper.html()).toContain('Mugatu')
  })

  test('Renders body instead of children, if defined', () => {
    const wrapper = shallow(
      <Bubble body='Mugatu'>
        Zoolander
      </Bubble>
    )
    const o = wrapper.find(ui.body)

    expect(o.length).toBe(1)
    expect(wrapper.html()).toContain('Mugatu')
    expect(wrapper.html()).not.toContain('Zoolander')
  })

  test('Renders body as HTML', () => {
    const html = '<div>Mugatu<br /></div>'
    const wrapper = shallow(
      <Bubble body={html} />
    )
    const o = wrapper.find(ui.body)

    expect(o.length).toBe(1)
    expect(wrapper.html()).toContain(html)
  })
})

describe('Styles', () => {
  test('Applies "from" styles, if defined', () => {
    const wrapper = shallow(<Bubble from />)

    expect(wrapper.hasClass('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = shallow(<Bubble to />)

    expect(wrapper.hasClass('is-to')).toBeTruthy()
  })

  test('Applies "note" styles, if defined', () => {
    const wrapper = shallow(<Bubble isNote />)

    expect(wrapper.hasClass('is-note')).toBeTruthy()
  })

  test('Applies "primary" styles, if defined', () => {
    const wrapper = shallow(<Bubble primary />)

    expect(wrapper.hasClass('is-primary')).toBeTruthy()
  })

  test('Applies "size" styles, if defined', () => {
    const wrapper = shallow(<Bubble size='sm' />)

    expect(wrapper.hasClass('is-sm')).toBeTruthy()
  })

  test('Applies "ltr" styles, if defined', () => {
    const wrapper = shallow(<Bubble ltr />)

    expect(wrapper.hasClass('is-ltr')).toBeTruthy()
  })

  test('Applies "rtl" styles, if defined', () => {
    const wrapper = shallow(<Bubble rtl />)

    expect(wrapper.hasClass('is-rtl')).toBeTruthy()
  })

  test('Applies "typing" styles, if defined', () => {
    const wrapper = shallow(<Bubble typing />)

    expect(wrapper.hasClass('is-typing')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = shallow(
      <Bubble />
    , {context: {theme: 'embed'}})

    expect(wrapper.hasClass('is-theme-embed')).toBe(true)
  })
})

describe('From', () => {
  test('It does not render a from name, by default', () => {
    const wrapper = mount(<Bubble from='Mugatu' />)
    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Does not render from name, if theme is notifications, but from is not provided', () => {
    const wrapper = mount(
      <Message.Provider theme='notifications'>
        <Bubble />
      </Message.Provider>
    )
    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Does not renders from name, if theme is notifications and from is not a string', () => {
    const wrapper = mount(
      <Message.Provider theme='notifications'>
        <Bubble from />
      </Message.Provider>
    )
    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Renders from name, if theme is notifications and from is a string', () => {
    const wrapper = mount(
      <Message.Provider theme='notifications'>
        <Bubble from='Mugatu' />
      </Message.Provider>
    )
    const o = wrapper.find(ui.from)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Mugatu')
  })
})

describe('Icon', () => {
  test('Does not render an icon by default', () => {
    const wrapper = mount(
      <Bubble body='derek' />
    )
    const o = wrapper.find(ui.icon)
    const w = wrapper.find(ui.iconWrapper)

    expect(o.length).toBe(0)
    expect(w.length).toBe(0)
  })

  test('Renders an icon, if specified', () => {
    const wrapper = shallow(
      <Bubble body='derek' icon='attachment' />
    )
    const o = wrapper.find(ui.icon)
    const w = wrapper.find(ui.iconWrapper)

    expect(o.length).toBe(1)
    expect(w.length).toBe(1)
    expect(o.prop('name')).toBe('attachment')
  })
})
