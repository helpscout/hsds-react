import React from 'react'
import { shallow } from 'enzyme'
import Message from '..'
import Action from '../Action'
import Bubble from '../Bubble'
import Chat from '../Chat'
import Content from '../Content'
import Media from '../Media'
import Question from '../Question'
import Timestamp from '../Timestamp'
import { Avatar } from '../../'

const cx = 'c-Message'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Message />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Message className='mugatu' />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Avatar', () => {
  test('Renders avatar block by default, but no Avatar', () => {
    const wrapper = shallow(<Message className='mugatu' from />)
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).toBeTruthy()
    expect(o.find(Avatar).length).toBeFalsy()
  })

  test('Can remove avatar block', () => {
    const wrapper = shallow(<Message className='mugatu' from showAvatar={false} />)
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).not.toBeTruthy()
  })

  test('Can render an Avatar', () => {
    const a = (<Avatar name='Mugatu' />)
    const wrapper = shallow(<Message className='mugatu' from avatar={a} />)
    const o = wrapper.find(`.${cx}__avatar-block`)

    expect(o.length).toBeTruthy()
    expect(o.find(Avatar).length).toBeTruthy()
  })
})

describe('Content', () => {
  const makeContentTest = (ComponentName) => {
    test(`Enhances ${ComponentName.name} child component`, () => {
      const wrapper = shallow(
        <Message
          from
          ltr
          rtl
          to
        >
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

  const chatTypes = [Action, Chat, Content, Media, Question]
  chatTypes.forEach(type => { makeContentTest(type) })

  test('Can render non-Message child components', () => {
    const wrapper = shallow(
      <Message>
        <div className='mugatu'>Mugatu</div>
      </Message>
    )
    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Sub-components', () => {
  test('Exports sub-components', () => {
    expect(Message.Action).toBe(Action)
    expect(Message.Bubble).toBe(Bubble)
    expect(Message.Chat).toBe(Chat)
    expect(Message.Content).toBe(Content)
    expect(Message.Media).toBe(Media)
    expect(Message.Question).toBe(Question)
    expect(Message.Timestamp).toBe(Timestamp)
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
})
