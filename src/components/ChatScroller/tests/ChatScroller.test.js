import React from 'react'
import { mount } from 'enzyme'
import ChatScroller, { getScrollProps, shouldAutoScroll } from '../index'
import Message from '../../Message'
import Scrollable from '../../Scrollable'

describe('Nodes', () => {
  test('Does not set childNode if empty', () => {
    const wrapper = mount(<ChatScroller />)

    const node = wrapper.instance().childNode

    expect(node).toBeFalsy()
  })

  test('Sets childNode on mount', () => {
    const wrapper = mount(
      <ChatScroller>
        <div />
      </ChatScroller>
    )

    const node = wrapper.instance().childNode

    expect(node).toBeTruthy()
    expect(node.tagName).toBe('DIV')
  })

  test('Does not set scrollableNode on mount, if not applicable', () => {
    const wrapper = mount(
      <ChatScroller>
        <div />
      </ChatScroller>
    )

    const node = wrapper.instance().scrollableNode

    expect(node).toBeFalsy()
  })

  test('Sets scrollableNode on mount, if applicable', () => {
    const wrapper = mount(
      <ChatScroller>
        <div>
          <Scrollable />
        </div>
      </ChatScroller>
    )

    const node = wrapper.instance().scrollableNode

    expect(node).toBeTruthy()
    expect(node.tagName).toBe('DIV')
  })

  test('Can sets scrollableNode on mount, for Scrollable child', () => {
    const wrapper = mount(
      <ChatScroller>
        <Scrollable />
      </ChatScroller>
    )

    const node = wrapper.instance().scrollableNode

    expect(node).toBeTruthy()
    expect(node.tagName).toBe('DIV')
  })
})

describe('getLatestMessageNode', () => {
  test('Does not return anything, if scrollableNode is undefined', () => {
    const wrapper = mount(<ChatScroller />)
    const node = wrapper.instance().getLatestMessageNode()

    expect(node).toBeFalsy()
  })

  test('Retrieves a message node, if defined', () => {
    const wrapper = mount(
      <ChatScroller>
        <Scrollable>
          <div>
            <Message to>
              <Message.Chat>RON!</Message.Chat>
            </Message>
          </div>
        </Scrollable>
      </ChatScroller>
    )
    const node = wrapper.instance().getLatestMessageNode()

    expect(node).toBeTruthy()
    expect(node.tagName).toBe('DIV')
  })

  test('Retrieves the last message node, if defined', () => {
    const wrapper = mount(
      <ChatScroller>
        <Scrollable>
          <div>
            <Message to>
              <Message.Chat>RON!</Message.Chat>
              <Message.Chat>BURGANDY!</Message.Chat>
            </Message>
          </div>
        </Scrollable>
      </ChatScroller>
    )
    const node = wrapper.instance().getLatestMessageNode()

    expect(node.innerHTML).toContain('BURGANDY!')
  })
})

describe('autoScroll', () => {
  test('Attempts to scroll when isTyping changes', () => {
    const wrapper = mount(
      <ChatScroller>
        <Scrollable />
      </ChatScroller>
    )
    const spy = jest.spyOn(wrapper.instance(), 'autoScrollToLatestMessage')

    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ isTyping: true })
    expect(spy).toHaveBeenCalled()
  })

  test('Attempts to scroll when messages change', () => {
    const wrapper = mount(
      <ChatScroller messages={[1]}>
        <Scrollable />
      </ChatScroller>
    )
    const spy = jest.spyOn(wrapper.instance(), 'autoScrollToLatestMessage')

    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ messages: [1, 2] })
    expect(spy).toHaveBeenCalled()
  })

  test('Attempts to scroll when lastMessageId changes', () => {
    const wrapper = mount(
      <ChatScroller lastMessageId="a">
        <Scrollable />
      </ChatScroller>
    )
    const spy = jest.spyOn(wrapper.instance(), 'autoScrollToLatestMessage')

    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ lastMessageId: 'b' })
    expect(spy).toHaveBeenCalled()
  })
})

describe('handleScroll', () => {
  test('Does not fire, if scrollableNode is not defined', () => {
    const spy = jest.fn()
    const wrapper = mount(<ChatScroller />)

    wrapper.setProps({
      onScroll: spy,
    })

    wrapper.instance().handleScroll()

    expect(spy).not.toHaveBeenCalled()
  })

  test('Callback event works when scroll happens', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChatScroller>
        <Scrollable />
      </ChatScroller>
    )

    wrapper.setProps({
      onScroll: spy,
    })

    wrapper.instance().forceScrollToBottom()

    expect(spy).toHaveBeenCalled()
  })
})

describe('forceScrollToBottom', () => {
  test('force scrolls to bottom on mount', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChatScroller onScroll={spy}>
        <Scrollable />
      </ChatScroller>
    )

    expect(spy).toHaveBeenCalled()
  })
})

describe('getScrollProps', () => {
  test("Returns empty object if props aren't provided", () => {
    expect(Object.values(getScrollProps()).length).toBe(0)

    expect(
      Object.values(
        getScrollProps({
          autoscrollOffset: undefined,
          messageNode: undefined,
          offsetThreshold: 50,
        })
      ).length
    ).toBe(0)
  })

  test('Returns object with calculated props with valid props', () => {
    const scrollableNode = {
      clientHeight: 300,
      scrollHeight: 1000,
      scrollTop: 100,
    }
    const offsetThreshold = 0.3
    const messageNode = {
      clientHeight: 50,
      offsetTop: 10,
    }

    const props = getScrollProps({
      distanceForAutoScroll: 150,
      messageNode,
      offsetThreshold,
      scrollableNode,
    })

    expect(props.position).toBeTruthy()
    expect(props.scrollHeight).toBeTruthy()
    expect(props.scrollTop).toBeTruthy()
  })
})

describe('shouldAutoScroll', () => {
  test("Returns false if props aren't provided", () => {
    expect(shouldAutoScroll()).toBe(false)

    expect(
      shouldAutoScroll({
        distanceForAutoScroll: undefined,
        scrollHeight: 100,
        scrollTop: 50,
      })
    ).toBe(false)
  })

  test('Returns false if distance is too far', () => {
    expect(
      shouldAutoScroll({
        distanceForAutoScroll: 150,
        scrollHeight: 3000,
        scrollTop: 50,
      })
    ).toBe(false)
  })

  test('Returns true if distance is within range', () => {
    expect(
      shouldAutoScroll({
        distanceForAutoScroll: 150,
        scrollHeight: 3000,
        scrollTop: 2900,
      })
    ).toBe(true)
  })
})
