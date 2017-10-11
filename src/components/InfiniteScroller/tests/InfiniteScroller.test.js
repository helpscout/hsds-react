import React from 'react'
import { mount, shallow } from 'enzyme'
import InfiniteScroller from '..'
import LoadingDots from '../../LoadingDots'
import Text from '../../Text'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<InfiniteScroller />)

    expect(wrapper.hasClass('c-InfiniteScroller')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<InfiniteScroller className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Node Scope', () => {
  test('Auto sets the node scope to parent node by default', () => {
    const wrapper = mount(
      <div className='derlict'>
        <InfiniteScroller />
      </div>
    )
    const o = wrapper.find(InfiniteScroller).node
    const d = wrapper.find('.derlict').node

    expect(o.state.nodeScope).toBe(d)
  })
})

describe('Loading', () => {
  test('Adds isLoading className', () => {
    const wrapper = shallow(<InfiniteScroller isLoading />)

    expect(wrapper.hasClass('is-loading')).toBeTruthy()
  })

  test('Renders LoadingDots by default when isLoading', () => {
    const wrapper = shallow(
      <InfiniteScroller isLoading />
    )
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(1)
  })

  test('Can render custom loading markup', () => {
    const wrapper = shallow(
      <InfiniteScroller isLoading loading={<Text>Derlict</Text>} />
    )
    const o = wrapper.find(LoadingDots)
    const n = wrapper.find(Text)

    expect(o.length).toBe(0)
    expect(n.length).toBe(1)
  })

  test('Can change isLoading state by prop change', () => {
    const wrapper = shallow(
      <InfiniteScroller />
    )

    expect(wrapper.state().isLoading).not.toBeTruthy()
    wrapper.setProps({ isLoading: true })
    expect(wrapper.state().isLoading).toBeTruthy()
  })
})

describe('Callbacks', () => {
  test('onLoading callback can be fired when triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<InfiniteScroller onLoading={spy} isLoading />)
    const o = wrapper.instance()

    o.handleOnLoading()

    expect(spy).toHaveBeenCalled()
    expect(wrapper.state().isLoading).toBeTruthy()
  })

  test('onLoading callback can fire onLoaded callback', (done) => {
    const spy = jest.fn()
    const onLoading = (onLoaded) => {
      spy()
      onLoaded()
    }
    const wrapper = shallow(<InfiniteScroller onLoading={onLoading} isLoading />)
    const o = wrapper.instance()

    o.handleOnLoading()

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      expect(wrapper.state().isLoading).not.toBeTruthy()
      done()
    }, 0)
  })

  test('Does not fire onLoading callback when isLoading is set', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <InfiniteScroller isLoading onLoading={spy} />
    )
    const o = wrapper.instance()

    o.handleOnScroll()

    expect(spy).not.toHaveBeenCalled()
  })

  test('onLoaded callback can be fired when triggered', (done) => {
    const spy = jest.fn()
    const wrapper = shallow(<InfiniteScroller onLoaded={spy} isLoading />)
    const o = wrapper.instance()

    o.handleOnLoading()

    expect(spy).not.toHaveBeenCalled()
    expect(wrapper.state().isLoading).toBeTruthy()

    o.handleOnLoaded()

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      expect(wrapper.state().isLoading).not.toBeTruthy()
      done()
    }, 0)
  })
})
