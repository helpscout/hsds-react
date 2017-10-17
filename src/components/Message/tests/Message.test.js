// import React from 'react'
// import { shallow } from 'enzyme'
import Message from '..'
import Action from '../Action'
import Bubble from '../Bubble'
import Chat from '../Chat'
import Content from '../Content'
import Media from '../Media'
import Question from '../Question'
import Timestamp from '../Timestamp'

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
