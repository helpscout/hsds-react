import * as React from 'react'
import ContentResizer from '../ActionSelect.ContentResizer'
import { mount } from 'enzyme'

describe('content resizer', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should call onEndAnimation', () => {
    const onAnimationEndSpy = jest.fn()
    const wrapper = mount(<ContentResizer onAnimationEnd={onAnimationEndSpy} />)
    wrapper.instance().onAnimationEnd()
  })

  it('should clear animationUpdateInterval if set', () => {
    const onAnimatedUpdateSpy = jest.fn()
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const wrapper = mount(
      <ContentResizer isOpen={true} onAnimationUpdate={onAnimatedUpdateSpy} />
    )
    wrapper.instance().addOnAnimationUpdate()
    wrapper.instance().addOnAnimationUpdate()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2)
  })

  it('should call setInterval', () => {
    const onAnimatedUpdateSpy = jest.fn()
    const setIntervalSpy = jest.spyOn(window, 'setInterval')
    const wrapper = mount(
      <ContentResizer isOpen={true} onAnimationUpdate={onAnimatedUpdateSpy} />
    )
    wrapper.instance().addOnAnimationUpdate()
    expect(setIntervalSpy).toHaveBeenCalledTimes(1)
  })
})
