import React from 'react'
import { mount, shallow, render } from 'enzyme'
import { Stepper } from './Stepper'
import Step from './Stepper.Step'
import { StepUI, StepperUI } from './Stepper.css'

const mockSteps = [
  {
    id: 'Id1',
    title: 'Test Title 1',
  },
  {
    id: 'Id2',
    title: 'Test Title 2',
  },
  {
    id: 'Id3',
    title: 'Test Title 3',
  },
  {
    id: 'Id4',
    title: 'Test Title 4',
  },
]

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<Stepper />)
    expect(wrapper.hasClass('c-Stepper')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<Stepper className={customClassName} />)
    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<Stepper data-cy="blue" />)
    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('children', () => {
  test('should have a child component for each step', () => {
    const wrapper = mount(<Stepper steps={mockSteps} currentIndex={0} />)
    const steps = wrapper.find(Step)
    expect(steps.length).toEqual(4)
  })
  test('should assign proper isActive state to each step', () => {
    const wrapper = mount(<Stepper steps={mockSteps} currentIndex={2} />)
    wrapper.update()
    const steps = wrapper.find(StepUI)
    let results = []
    steps.forEach(step => {
      results.push(step.hasClass('is-active'))
    })
    expect(results[0]).toEqual(true)
    expect(results[1]).toEqual(true)
    expect(results[2]).toEqual(true)
    expect(results[3]).toEqual(false)
  })
})

describe('callbacks', () => {
  test('should call callbacks', () => {
    const onChangeSpy = jest.fn()
    const onCompleteSpy = jest.fn()
    const wrapper = mount(
      <Stepper
        onChange={onChangeSpy}
        onComplete={onCompleteSpy}
        currentIndex={0}
        steps={mockSteps}
      />
    )
    expect(onChangeSpy).toHaveBeenCalledTimes(0)
    expect(onCompleteSpy).toHaveBeenCalledTimes(0)
    wrapper.setProps({ currentIndex: 1 })
    expect(onChangeSpy).toHaveBeenCalledTimes(1)
    expect(onCompleteSpy).toHaveBeenCalledTimes(0)
    wrapper.setProps({ currentIndex: 2 })
    expect(onChangeSpy).toHaveBeenCalledTimes(2)
    expect(onCompleteSpy).toHaveBeenCalledTimes(0)
    wrapper.setProps({ currentIndex: 3 })
    expect(onChangeSpy).toHaveBeenCalledTimes(3)
    expect(onCompleteSpy).toHaveBeenCalledTimes(1)
  })
  test('should call onStepClick callback', () => {
    const onStepClickSpy = jest.fn()
    const wrapper = shallow(
      <Stepper steps={mockSteps} onStepClick={onStepClickSpy} />
    )
    wrapper
      .find(Step)
      .at(0)
      .simulate('click')
    expect(onStepClickSpy).toHaveBeenCalledTimes(1)
  })
})

describe('StepperUI', () => {
  test('should return the correct value for getProgress', () => {
    const wrapper = mount(<Stepper steps={mockSteps} currentIndex={2} />)
    expect(wrapper.find(StepperUI).prop('aria-valuenow')).toEqual(3)
  })
})

describe('getProgress', () => {
  test('should equal 2', () => {
    const wrapper = mount(<Stepper steps={mockSteps} currentIndex={1} />)

    expect(wrapper.instance().getProgress()).toEqual(2)
  })
  test('when no currentIndex is null, kkshould return 1', () => {
    const wrapper = mount(<Stepper currentIndex={null} />)

    expect(wrapper.instance().getProgress()).toEqual(1)
  })
})

describe('getMatchIndex', () => {
  test('should return 1', () => {
    const wrapper = mount(<Stepper currentIndex={1} />)

    expect(wrapper.instance().getMatchIndex()).toEqual(1)
  })
  test('when no currentIndex defined should return 0', () => {
    const wrapper = mount(<Stepper currentIndex={null} />)

    expect(wrapper.instance().getMatchIndex()).toEqual(-1)
  })
})

describe('componentDidUpdate', () => {
  test('should call onChange callback', () => {
    const onChangeSpy = jest.fn()
    const wrapper = mount(
      <Stepper onChange={onChangeSpy} steps={mockSteps} currentIndex={1} />
    )

    wrapper.instance().componentDidUpdate({ currentIndex: 0 })
    expect(onChangeSpy).toHaveBeenCalled()
  })
  test('should not call onChange callback', () => {
    const onChangeSpy = jest.fn()
    const wrapper = mount(
      <Stepper onChange={onChangeSpy} steps={mockSteps} currentIndex={1} />
    )

    wrapper.instance().componentDidUpdate({ currentIndex: 1 })
    expect(onChangeSpy).not.toHaveBeenCalled()
  })
})

describe('handleChangeCallback', () => {
  test('should not call onChange', () => {
    const onChangeSpy = jest.fn()
    const wrapper = mount(
      <Stepper onChange={onChangeSpy} steps={[]} currentIndex={1} />
    )

    wrapper.instance().handleChangeCallback()
    expect(onChangeSpy).not.toHaveBeenCalled()
  })
})

describe('Step className', () => {
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
