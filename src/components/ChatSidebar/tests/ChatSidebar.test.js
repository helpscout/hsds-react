import React from 'react'
import { mount, shallow } from 'enzyme'
import ChatSidebar from '..'
import { Scrollable, StatusBar } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<ChatSidebar />)
    const o = wrapper.find('.c-ChatSidebar')

    expect(o.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<ChatSidebar className={customClass} />)
    const o = wrapper.find('.c-ChatSidebar')

    expect(o.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render children content', () => {
    const wrapper = shallow(<ChatSidebar><div className='child'>Hello</div></ChatSidebar>)
    const o = wrapper.find('div.child')

    expect(o.length).toBe(1)
  })
})

describe('Content', () => {
  test('Content is added within a Scrollable component', () => {
    const wrapper = shallow(
      <ChatSidebar>
        <div className='derek'>ONE LOOK?!</div>
      </ChatSidebar>
    )
    const scrollable = wrapper.find(Scrollable)
    const o = scrollable.find('.derek')

    expect(scrollable.length).toBe(1)
    expect(scrollable.hasClass('c-ChatSidebar__content')).toBe(true)
    expect(o.length).toBe(1)
  })

  test('Scrollable is set as the contentNode', () => {
    const wrapper = mount(<ChatSidebar />)
    const o = wrapper.instance()

    expect(o.contentNode).toBeTruthy()
  })

  test('Can fire onScroll callback', () => {
    const spy = jest.fn()
    const wrapper = shallow(<ChatSidebar onScroll={spy} />)
    const o = wrapper.find(Scrollable)

    o.simulate('scroll')

    expect(spy).toHaveBeenCalled()
  })
})

describe('StatusBar', () => {
  test('Does not show StatusBar by default', () => {
    const wrapper = shallow(<ChatSidebar />)
    const o = wrapper.find('.c-ChatSidebar__status-bar')
    const statusBar = o.find(StatusBar)

    expect(o.length).toBe(1)
    expect(statusBar.length).toBe(1)
    expect(statusBar.props().isOpen).toBe(false)
  })

  test('Can fire onShowStatusBar callback', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChatSidebar
        onShowStatusBar={spy}
        isShowStatusBar
        statusBarScrollTopOffset={-10}
        newMessageCount={3}
      />)
    const o = wrapper.instance()
    o.handleOnScroll()

    expect(spy).toHaveBeenCalledWith(3)
  })

  test('Can fire onHideStatusBar callback', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChatSidebar
        onHideStatusBar={spy}
        isShowStatusBar
        statusBarScrollTopOffset={10}
        newMessageCount={3}
      />)
    const o = wrapper.instance()
    o.handleOnScroll()

    expect(spy).toHaveBeenCalledWith(3)
  })

  test('Fires onHideStatusBar callback onClick', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ChatSidebar
        onHideStatusBar={spy}
        isShowStatusBar
        statusBarScrollTopOffset={10}
        newMessageCount={3}
      />)
    const statusBar = wrapper.find(StatusBar)
    statusBar.props().onClick()

    expect(spy).toHaveBeenCalledWith(3)
  })
})
