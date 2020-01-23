import React from 'react'
import { mount } from 'enzyme'
import VerificationCode from './'
import {
  VerificationCodeFieldUI,
  DigitInputWrapperUI,
  ClipboardPlaceholderUI,
  DigitMaskUI,
  DigitInputUI,
  ValidIconUI,
} from './VerificationCode.css'

window.getSelection = () => ({
  addRange: () => {},
  removeAllRanges: () => {},
  toString: () => {},
})

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<VerificationCode />)

    expect(
      wrapper.find(VerificationCodeFieldUI).hasClass('c-VerificationCode')
    ).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'clazz'
    const wrapper = mount(<VerificationCode className={customClassName} />)

    expect(
      wrapper.find(VerificationCodeFieldUI).hasClass(customClassName)
    ).toBeTruthy()
  })

  test('Adds invalid classname when code is not valid', () => {
    const invalidClassName = 'not-valid'
    const wrapper = mount(<VerificationCode isValid={false} />)

    expect(
      wrapper.find(VerificationCodeFieldUI).hasClass(invalidClassName)
    ).toBeTruthy()
  })
})

describe('Render', () => {
  test('should render 6 inputs by default', () => {
    const wrapper = mount(<VerificationCode />)

    expect(wrapper.find(DigitInputWrapperUI).length).toBe(6)
  })

  test('should render the given amount of inputs if specified', () => {
    const wrapper = mount(<VerificationCode numberOfChars={4} />)

    expect(wrapper.find(DigitInputWrapperUI).length).toBe(4)
  })

  test('should render the invisible clipboard placeholder', () => {
    const wrapper = mount(<VerificationCode />)

    expect(wrapper.find(ClipboardPlaceholderUI).length).toBe(1)
  })

  test('should render the mask inside the input wrapper', () => {
    const wrapper = mount(<VerificationCode />)

    expect(
      wrapper
        .find(DigitInputWrapperUI)
        .first()
        .find(DigitMaskUI).length
    ).toBe(1)
  })

  test('should render the input inside the wrapper', () => {
    const wrapper = mount(<VerificationCode />)

    expect(
      wrapper
        .find(DigitInputWrapperUI)
        .first()
        .find(DigitInputUI).length
    ).toBe(1)
  })

  test('should render the warning icon if not valid', () => {
    const wrapper = mount(<VerificationCode isValid={false} />)

    expect(wrapper.find(ValidIconUI).length).toBe(1)
  })
})

describe('Paste', () => {
  test('should paste the data correctly into the inputs', () => {
    const TEXT = '123456'

    const eventMock = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      clipboardData: {
        getData: t => TEXT,
      },
    }
    const wrapper = mount(<VerificationCode />)

    wrapper.simulate('paste', eventMock)

    expect(eventMock.stopPropagation).toHaveBeenCalled()
    expect(eventMock.preventDefault).toHaveBeenCalled()

    wrapper.instance().digitInputNodes.forEach((node, index) => {
      expect(node.value).toBe(TEXT.charAt(index))
    })
  })
})

describe('Input KeyUp', () => {
  test('should ignore Meta', () => {
    const onChangeSpy = jest.fn()
    const eventMock = {
      key: 'Meta',
    }

    const wrapper = mount(<VerificationCode onChange={onChangeSpy} />)

    wrapper
      .find(DigitInputUI)
      .first()
      .prop('onKeyUp')(eventMock)

    expect(onChangeSpy).not.toHaveBeenCalled()
  })

  test('on backspace it should call onchange and move the focus to the previous digit ', () => {
    const eventMock = {
      key: 'Backspace',
      target: {
        value: '',
      },
    }
    const onChangeSpy = jest.fn()
    const wrapper = mount(<VerificationCode onChange={onChangeSpy} />)

    wrapper
      .find(DigitInputUI)
      .at(3)
      .prop('onKeyUp')(eventMock)

    expect(onChangeSpy).toHaveBeenCalled()
    expect(wrapper.instance().digitMaskNodes[3].innerText).toBe('')
    expect(document.activeElement).toStrictEqual(
      wrapper.instance().digitInputNodes[2]
    )
  })

  test('on backspace it should keep the focus on first digit if that is where we are ', () => {
    const eventMock = {
      key: 'Backspace',
      target: {
        value: '',
      },
    }
    const onChangeSpy = jest.fn()
    const wrapper = mount(<VerificationCode onChange={onChangeSpy} />)

    wrapper
      .find(DigitInputUI)
      .at(0)
      .prop('onKeyUp')(eventMock)

    expect(onChangeSpy).toHaveBeenCalled()
    expect(wrapper.instance().digitMaskNodes[0].innerText).toBe('')
    expect(document.activeElement).toStrictEqual(
      wrapper.instance().digitInputNodes[0]
    )
  })

  test('should clear all on backspace if something selected ', () => {
    window.getSelection = () => ({
      addRange: () => {},
      removeAllRanges: () => {},
      toString: () => '123',
    })

    const onChangeSpy = jest.fn()

    const eventMock = {
      key: 'Backspace',
      target: {
        value: '',
      },
    }

    const wrapper = mount(<VerificationCode onChange={onChangeSpy} />)

    wrapper
      .find(DigitInputUI)
      .first()
      .prop('onKeyUp')(eventMock)

    wrapper.instance().digitInputNodes.forEach((node, index) => {
      expect(node.value).toBe('')
      expect(wrapper.instance().digitMaskNodes[index].innerText).toBe('')
    })
    expect(onChangeSpy).toHaveBeenCalledWith('')
    expect(document.activeElement).toStrictEqual(
      wrapper.instance().digitInputNodes[0]
    )
  })
})
