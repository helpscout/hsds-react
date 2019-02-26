import * as React from 'react'
import { mount } from 'enzyme'
import Step from '../Stepper.Step'

describe('className', () => {
  test('should call click handler if isClickable is true', () => {
    const onClickSpy = jest.fn()
    const wrapper = mount(<Step isClickable={true} onClick={onClickSpy} />)
    wrapper
      .find('.c-StepperStep')
      .at(0)
      .simulate('click')
    expect(onClickSpy).toHaveBeenCalledTimes(1)
  })
  test('should NOT call click handler if isClickable is false', () => {
    const onClickSpy = jest.fn()
    const wrapper = mount(<Step isClickable={false} onClick={onClickSpy} />)
    wrapper
      .find('.c-StepperStep')
      .at(0)
      .simulate('click')
    expect(onClickSpy).toHaveBeenCalledTimes(0)
  })
})
