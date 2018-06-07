import React from 'react'
import { mount, shallow } from 'enzyme'
import Message from '..'
import Action from '../Action'
import Attachment from '../Attachment'
import Bubble from '../Bubble'
import Chat from '../Chat'
import Content from '../Content'
import Media from '../Media'
import Question from '../Question'
import { Avatar } from '../../'

const cx = 'c-Message'
const ui = {
  avatar: `.${cx}__avatar-block`,
  from: `.${cx}__from`,
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Message />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Message className="mugatu" />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Avatar', () => {
  test('Renders avatar block by default, but no Avatar', () => {
    const wrapper = shallow(<Message className="mugatu" from />)
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).toBeTruthy()
    expect(o.find(Avatar).length).toBeFalsy()
  })

  test('Can remove avatar block', () => {
    const wrapper = shallow(
      <Message className="mugatu" from showAvatar={false} />
    )
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).not.toBeTruthy()
  })

  test('Can render an Avatar', () => {
    const a = <Avatar name="Mugatu" />
    const wrapper = shallow(<Message className="mugatu" from avatar={a} />)
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).toBeTruthy()
    expect(o.find(Avatar).length).toBeTruthy()
  })

  test('Adds className if avatat is provided', () => {
    const a = <Avatar name="Mugatu" />
    const wrapper = shallow(<Message className="mugatu" from avatar={a} />)

    expect(wrapper.hasClass('has-avatar')).toBeTruthy()
  })
})

describe('Content', () => {
  const makeContentTest = ComponentName => {
    test(`Enhances ${ComponentName.name} child component`, () => {
      const wrapper = shallow(
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
    const wrapper = shallow(
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

describe('Sub-components', () => {
  test('Exports sub-components', () => {
    expect(Message.Action).toBe(Action)
    expect(Message.Attachment).toBe(Attachment)
    expect(Message.Bubble).toBe(Bubble)
    expect(Message.Chat).toBe(Chat)
    expect(Message.Content).toBe(Content)
    expect(Message.Media).toBe(Media)
    expect(Message.Question).toBe(Question)
  })
})

describe('Styles', () => {
  test('Applies "from" styles, if defined', () => {
    const wrapper = shallow(<Message from />)

    expect(wrapper.hasClass('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = shallow(<Message to />)

    expect(wrapper.hasClass('is-to')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = shallow(<Message />, { context: { theme: 'embed' } })

    expect(wrapper.hasClass('is-theme-embed')).toBe(true)
  })

  describe('Theme: Embed', () => {
    test('Can show Avatar for "from" message', () => {
      const a = <Avatar name="Mugatu" />
      const wrapper = shallow(<Message avatar={a} showAvatar from />, {
        context: { theme: 'embed' },
      })

      const o = wrapper.find(ui.avatar)

      expect(o.length).toBe(1)
    })

    test('Always hide avatar for "to" message', () => {
      const a = <Avatar name="Mugatu" />
      const wrapper = shallow(<Message avatar={a} showAvatar to />, {
        context: { theme: 'embed' },
      })

      const o = wrapper.find(ui.avatar)

      expect(o.length).toBe(0)
    })

    test('Always render Circle avatars for embed', () => {
      const a = <Avatar name="Mugatu" shape="square" />
      const wrapper = shallow(<Message avatar={a} showAvatar from />, {
        context: { theme: 'embed' },
      })

      const o = wrapper.find(Avatar)

      expect(o.prop('shape')).toBe('circle')
    })
  })
})

describe('From', () => {
  test('Does not render by default', () => {
    const wrapper = shallow(<Message from />)
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
