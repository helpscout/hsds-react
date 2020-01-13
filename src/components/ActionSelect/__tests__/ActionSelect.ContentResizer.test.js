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

  it('should clear animationUpdateInterval if set', () => {
    const onAnimateUpdateSpy = jest.fn()
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const wrapper = mount(
      <ContentResizer isOpen={true} onAnimationUpdate={onAnimateUpdateSpy} />
    )
    wrapper.instance().addOnAnimationUpdate()
    wrapper.instance().addOnAnimationUpdate()
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2)
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
})
