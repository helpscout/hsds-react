import React from 'react'
import { shallow } from 'enzyme'
import Timer from '../Timer'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Timer />)

    expect(wrapper.hasClass('c-NotificationTimer')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Timer className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Timeout', () => {
  test('Customizes the animationDuration based on timeout prop', () => {
    const wrapper = shallow(<Timer timeout={100} />)

    expect(wrapper.prop('style').animationDuration).toBe('100ms')
  })

  test('Accepts a string', () => {
    const wrapper = shallow(<Timer timeout="251ms" />)

    expect(wrapper.prop('style').animationDuration).toBe('251ms')
  })
})

describe('isRunning', () => {
  test('animationPlayState is running by default', () => {
    const wrapper = shallow(<Timer />)

    expect(wrapper.prop('style').animationPlayState).toBe('running')
  })

  test('Pauses animationPlayState if isRunning is set to false', () => {
    const wrapper = shallow(<Timer isRunning={false} />)

    expect(wrapper.prop('style').animationPlayState).toBe('paused')
  })
})

describe('onAnimationEnd', () => {
  test('Fires onTimerEnd callback, when animation is done playing', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Timer onTimerEnd={spy} />)
    wrapper.simulate('animationEnd')

    expect(spy).toHaveBeenCalled()
  })
})
