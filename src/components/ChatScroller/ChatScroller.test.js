import React from 'react'
import { mount } from 'enzyme'
import { ChatScroller } from './ChatScroller'
import {
  shouldAutoScroll,
  getScrollProps,
  allDefined,
} from './ChatScroller.utils'
import Message from '../Message'
import Scrollable from '../Scrollable'

function mockSetNode(wrapper) {
  const node = wrapper.find('div.c-ScrollableNode').getDOMNode()
  wrapper.instance().scrollableNode = node

  return wrapper
}

describe('Nodes', () => {
  test('Does not set childRef if empty', () => {
    const wrapper = mount(<ChatScroller />)

    const node = wrapper.instance().childRef

    expect(node).toBeFalsy()
  })

  test('Sets childRef on mount', () => {
    const wrapper = mount(
      <ChatScroller>
        <div />
      </ChatScroller>
    )

    const node = wrapper.instance().childRef

    expect(node).toBeTruthy()
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

  test('Can set scrollableNode if defined', () => {
    const el = document.createElement('div')
    const wrapper = mount(
      <ChatScroller scrollableNode={el}>
        <div />
      </ChatScroller>
    )

    const node = wrapper.instance().scrollableNode

    expect(node).toBe(el)
  })

  test('Can reset scrollableNode on scrollableNode prop change', () => {
    const el = document.createElement('div')
    const nextEl = document.createElement('span')
    const wrapper = mount(
      <ChatScroller scrollableNode={el}>
        <div />
      </ChatScroller>
    )

    wrapper.setProps({ scrollableNode: nextEl })

    const node = wrapper.instance().scrollableNode

    expect(node).not.toBe(el)
    expect(node).toBe(nextEl)
  })

  test('Can reset scrollableNode on scrollableSelector prop change', () => {
    const wrapper = mount(
      <ChatScroller scrollableSelector=".derek">
        <div>
          <div className="derek" />
          <div className="hansel" />
        </div>
      </ChatScroller>
    )

    wrapper.setProps({ scrollableSelector: '.hansel' })
    const node = wrapper.instance().scrollableNode

    expect(node.classList.contains('hansel')).toBe(true)
  })

  test('scrollableNode does not reset on unrelated prop changes', () => {
    const el = document.createElement('div')
    const wrapper = mount(
      <ChatScroller scrollableNode={el}>
        <div />
      </ChatScroller>
    )

    wrapper.setProps({ title: 'Hello!' })

    const node = wrapper.instance().scrollableNode

    expect(node).toBe(el)
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
    // Mock the scrollableNode set
    mockSetNode(wrapper)
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
    // Mock the scrollableNode set
    mockSetNode(wrapper)
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

    mockSetNode(wrapper)
    wrapper.instance().forceScrollToBottom()

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

describe('forceScrollToBottomProp', () => {
  test('Should attempt to scroll if forceScrollToBottomProp changes', () => {
    const spy = jest.fn()
    const wrapper = mount(<ChatScroller forceScrollToBottomProp="one" />)
    const inst = wrapper.instance()
    inst.forceScrollToBottom = spy

    expect(spy).not.toHaveBeenCalled()

    wrapper.setProps({ forceScrollToBottomProp: 'two' })
    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ forceScrollToBottomProp: 'three' })
    expect(spy).toHaveBeenCalledTimes(2)

    wrapper.setProps({ forceScrollToBottomProp: 'one' })
    expect(spy).toHaveBeenCalledTimes(3)

    wrapper.setProps({ forceScrollToBottomProp: 'one' })
    expect(spy).toHaveBeenCalledTimes(3)
  })
})

describe('allDefined', () => {
  test('Returns true if defined', () => {
    expect(allDefined([1, 2, 3])).toBe(true)
    expect(allDefined({ a: 1, b: 2, c: 3 })).toBe(true)
  })

  test('Returns false if undefined', () => {
    expect(allDefined()).toBe(false)
    expect(allDefined([1, null, 3])).toBe(false)
    expect(allDefined([1, false, null])).toBe(false)
    expect(allDefined([1, undefined, false])).toBe(false)
    expect(allDefined([1, undefined, null])).toBe(false)
    expect(allDefined([undefined, undefined, 3])).toBe(false)
    expect(allDefined([null, null])).toBe(false)
    expect(allDefined([undefined, undefined])).toBe(false)
  })
})
