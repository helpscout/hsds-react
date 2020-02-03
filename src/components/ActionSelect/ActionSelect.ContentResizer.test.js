import * as React from 'react'
import ContentResizer from './ActionSelect.ContentResizer'
import { mount } from 'enzyme'

describe('content resizer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call clearInterval onEndAnimation', () => {
    const onAnimationEndSpy = jest.fn()
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const wrapper = mount(
      <ContentResizer isOpen={true} onAnimationEnd={onAnimationEndSpy} />
    )
    wrapper.instance().animationUpdateInterval = 1
    wrapper.instance().onAnimationEnd()
    expect(onAnimationEndSpy).toHaveBeenCalledTimes(1)
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
  })

  it('should clear animationUpdateInterval if set', () => {
    const onAnimateUpdateSpy = jest.fn()
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const wrapper = mount(
      <ContentResizer isOpen={true} onAnimationUpdate={onAnimateUpdateSpy} />
    )
    wrapper.instance().addOnAnimationUpdate()
    wrapper.instance().addOnAnimationUpdate()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
  })

  it('should call setInterval', () => {
    const onAnimateUpdateSpy = jest.fn()
    const setIntervalSpy = jest.spyOn(window, 'setInterval')
    const wrapper = mount(
      <ContentResizer isOpen={true} onAnimationUpdate={onAnimateUpdateSpy} />
    )
    wrapper.instance().addOnAnimationUpdate()
    expect(setIntervalSpy).toHaveBeenCalled()
  })

  it('it should call clearInterval if animationUpdateInterval exsits and resizeCount changes', () => {
    const onAnimateUpdateSpy = jest.fn()
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const wrapper = mount(
      <ContentResizer
        isOpen={true}
        onAnimationUpdate={onAnimateUpdateSpy}
        resizeCount={1}
      />
    )
    wrapper.instance().addOnAnimationUpdate()
    wrapper.setProps({ resizeCount: 3 })
    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
