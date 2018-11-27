import React from 'react'
import { mount } from 'enzyme'
import Message from '../Message'
import Action from '../Action'
import Attachment from '../Attachment'
import Bubble from '../Bubble'
import Chat from '../Chat'
import Content from '../Content'
import Media from '../Media'
import Question from '../Question'
import { Avatar } from '../../index'

const cx = 'c-Message'
const ui = {
  base: `.${cx}`,
  avatar: `.${cx}__avatar-block`,
  from: `.${cx}__from`,
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Message />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Message className="mugatu" />)
    const o = wrapper.find(`.${cx}`)

    expect(o.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Avatar', () => {
  test('Renders avatar block by default, but no Avatar', () => {
    const wrapper = mount(<Message className="mugatu" from />)
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).toBeTruthy()
    expect(o.find(Avatar).length).toBeFalsy()
  })

  test('Can remove avatar block', () => {
    const wrapper = mount(
      <Message className="mugatu" from showAvatar={false} />
    )
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).not.toBeTruthy()
  })

  test('Can render an Avatar', () => {
    const a = <Avatar name="Mugatu" />
    const wrapper = mount(<Message className="mugatu" from avatar={a} />)
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).toBeTruthy()
    expect(o.find(Avatar).length).toBeTruthy()
  })

  test('Adds className if avatat is provided', () => {
    const a = <Avatar name="Mugatu" />
    const wrapper = mount(<Message className="mugatu" from avatar={a} />)

    expect(wrapper.getDOMNode().classList.contains('has-avatar')).toBeTruthy()
  })
})

describe('Content', () => {
  const makeContentTest = ComponentName => {
    test(`Enhances ${ComponentName.name} child component`, () => {
      const wrapper = mount(
        <Message from ltr rtl to>
          {React.createElement(ComponentName)}
        </Message>
      )
      const b = wrapper.find(`.${cx}__block`)
      const o = b.find(ComponentName)
      const p = o.props()

      expect(o.length).toBeTruthy()
      expect(p.to).toBeTruthy()
      expect(p.from).toBeTruthy()
      expect(p.ltr).toBeTruthy()
      expect(p.rtl).toBeTruthy()
    })
  }

  const chatTypes = [Action, Attachment, Chat, Content, Media, Question]
  chatTypes.forEach(type => {
    makeContentTest(type)
  })

  test('Can render non-Message child components', () => {
    const wrapper = mount(
      <Message>
        <div className="mugatu">Mugatu</div>
      </Message>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })

  test('Does not break when provided with null content', () => {
    const wrapper = mount(<Message>{null}</Message>)

    expect(wrapper).toBeTruthy()
  })

  test('Does not break when provided with undefined content', () => {
    const wrapper = mount(<Message>{undefined}</Message>)

    expect(wrapper).toBeTruthy()
  })

  test('Does not break when provided with empty content', () => {
    const wrapper = mount(<Message>{[]}</Message>)

    expect(wrapper).toBeTruthy()
  })

  test('Does not break when provided with an array of empty content', () => {
    const wrapper = mount(<Message>{[null, undefined, null, null]}</Message>)

    expect(wrapper).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Applies "from" styles, if defined', () => {
    const wrapper = mount(<Message from />)

    expect(wrapper.getDOMNode().classList.contains('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = mount(<Message to />)

    expect(wrapper.getDOMNode().classList.contains('is-to')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Message />
      </Message.Provider>
    )
    const el = wrapper.find(ui.base)

    expect(el.props().className).toContain('is-theme-embed')
  })

  describe('Theme: Embed', () => {
    test('Can show Avatar for "from" message', () => {
      const a = <Avatar name="Mugatu" />
      const wrapper = mount(
        <Message.Provider theme="embed">
          <Message avatar={a} showAvatar from />
        </Message.Provider>
      )

      const o = wrapper.find(ui.avatar).first()

      expect(o.length).toBe(1)
    })

    test('Always hide avatar for "to" message', () => {
      const a = <Avatar name="Mugatu" />
      const wrapper = mount(
        <Message.Provider theme="embed">
          <Message avatar={a} showAvatar to />
        </Message.Provider>
      )

      const o = wrapper.find(ui.avatar)

      expect(o.length).toBe(0)
    })

    test('Always render Circle avatars for embed', () => {
      const a = <Avatar name="Mugatu" shape="square" />
      const wrapper = mount(
        <Message.Provider theme="embed">
          <Message avatar={a} showAvatar from />
        </Message.Provider>
      )

      const o = wrapper.find(Avatar)

      expect(o.prop('shape')).toBe('circle')
    })
  })
})

describe('From', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Message from />)
    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Does not render, unless using context.theme.embed', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Message from="Blue" />
      </Message.Provider>
    )

    let o = wrapper.find(ui.from)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Blue')

    wrapper.setProps({ theme: 'admin' })

    o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Does not render if set to true', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Message from />
      </Message.Provider>
    )

    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })

  test('Does not render if from is empty string', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Message from="" />
      </Message.Provider>
    )

    const o = wrapper.find(ui.from)

    expect(o.length).toBe(0)
  })
})

describe('Note', () => {
  // Temporarily disabled for now.
  // test('Can pass isNote prop to child Message sub-components', () => {
  //   const wrapper = mount(
  //     <Message isNote>
  //       <Message.Chat />
  //     </Message>
  //   )
  //   const o = wrapper.find('Chat').first()
  //   expect(o.props().isNote).toBe(true)
  //   wrapper.setProps({ isNote: false })
  //   expect(o.props().isNote).toBe(false)
  // })
})
