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
  toString: () => '',
})
let container

beforeEach(() => {
  container = document.createElement('div')
  container.id = 'enzymeContainer'
  document.body.appendChild(container)
})

afterEach(() => {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container)
  }

  container = null
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
      wrapper.find(DigitInputWrapperUI).first().find(DigitMaskUI).length
    ).toBe(1)
  })

  test('should render the input inside the wrapper', () => {
    const wrapper = mount(<VerificationCode />)

    expect(
      wrapper.find(DigitInputWrapperUI).first().find(DigitInputUI).length
    ).toBe(1)
  })

  test('should render the warning icon if not valid', () => {
    const wrapper = mount(<VerificationCode isValid={false} />)

    expect(wrapper.find(ValidIconUI).length).toBe(1)
  })
})

describe('Code value prop', () => {
  test('should fill the input with the given code on mount', () => {
    const CODE = '123456'
    const wrapper = mount(<VerificationCode code={CODE} />)

    wrapper.instance().digitInputNodes.forEach((node, index) => {
      expect(node.value).toBe(CODE.charAt(index))
    })
  })

  test('should fill the input with the given code on prop change', () => {
    const CODE1 = '123456'
    const CODE2 = '456789'
    const wrapper = mount(<VerificationCode code={CODE1} />)

    wrapper.instance().digitInputNodes.forEach((node, index) => {
      expect(node.value).toBe(CODE1.charAt(index))
    })

    wrapper.setProps({ code: CODE2 })

    wrapper.instance().digitInputNodes.forEach((node, index) => {
      expect(node.value).toBe(CODE2.charAt(index))
    })
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

    wrapper.find(DigitInputUI).first().prop('onKeyUp')(eventMock)

    expect(onChangeSpy).not.toHaveBeenCalled()
  })

  test('on backspace it should call onchange and update the mask value if there is not a value', () => {
    window.getSelection = () => ({
      toString: () => '',
    })
    const eventMock = {
      key: 'Backspace',
      target: {
        value: '',
      },
    }
    const onChangeSpy = jest.fn()
    const wrapper = mount(<VerificationCode onChange={onChangeSpy} />)

    wrapper.find(DigitInputUI).at(3).simulate('focus')

    wrapper.find(DigitInputUI).at(3).prop('onKeyUp')(eventMock)

    expect(onChangeSpy).toHaveBeenCalled()
    expect(wrapper.instance().digitMaskNodes[3].innerText).toBe('')
  })

  test('on backspace it should call onchange and update the mask value if there is a value', () => {
    window.getSelection = () => ({
      toString: () => '',
    })
    const eventMock = {
      key: 'Backspace',
      target: {
        value: '',
      },
    }
    const onChangeSpy = jest.fn()
    const wrapper = mount(
      <VerificationCode onChange={onChangeSpy} code="123456" />
    )

    wrapper.find(DigitInputUI).at(3).simulate('focus')

    wrapper.find(DigitInputUI).at(3).prop('onKeyUp')(eventMock)

    expect(onChangeSpy).toHaveBeenCalled()
    expect(wrapper.instance().digitMaskNodes[3].innerText).toBe('')
  })

  test('on backspace it should keep the focus on first digit if that is where we are ', () => {
    const eventMock = {
      key: 'Backspace',
      target: {
        value: '',
      },
    }
    const onChangeSpy = jest.fn()

    const wrapper = mount(<VerificationCode onChange={onChangeSpy} />, {
      attachTo: container,
    })

    wrapper.find(DigitInputUI).at(0).prop('onKeyUp')(eventMock)

    expect(onChangeSpy).toHaveBeenCalled()
    expect(wrapper.instance().digitMaskNodes[0].innerText).toBe('')
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

    const wrapper = mount(<VerificationCode onChange={onChangeSpy} />, {
      attachTo: container,
    })

    wrapper.find(DigitInputUI).first().prop('onKeyUp')(eventMock)

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

describe('Enter key down', () => {
  test('should call onEnter', () => {
    const eventMock = {
      key: 'Enter',
    }
    const onEnterSpy = jest.fn()

    const wrapper = mount(<VerificationCode onEnter={onEnterSpy} />)

    wrapper.simulate('keyDown', eventMock)

    expect(onEnterSpy).toHaveBeenCalled()
  })
})

describe('Field click', () => {
  test('should handle focus first input if no other input is focused', () => {
    jest.useFakeTimers()
    const wrapper = mount(<VerificationCode />, {
      attachTo: container,
    })

    wrapper.simulate('mousedown')
    jest.runAllTimers()

    expect(document.activeElement).toStrictEqual(
      wrapper.instance().digitInputNodes[0]
    )
  })

  test('should keep input focus if one is focused', () => {
    jest.useFakeTimers()

    const wrapper = mount(<VerificationCode />, {
      attachTo: container,
    })

    wrapper.simulate('mousedown')
    jest.runAllTimers()
    const input = wrapper.find('.DigitInput').at(2).getDOMNode()

    expect(document.activeElement).toStrictEqual(input)

    wrapper.simulate('mousedown')
    jest.runAllTimers()

    expect(document.activeElement).toStrictEqual(
      wrapper.instance().digitInputNodes[2]
    )

    wrapper.simulate('mousedown')
    jest.runAllTimers()

    expect(document.activeElement).toStrictEqual(
      wrapper.instance().digitInputNodes[2]
    )
  })
})

describe('Input click', () => {
  test('should assign correct visual classes ', () => {
    const wrapper = mount(<VerificationCode />)

    wrapper.find(DigitInputUI).first().simulate('click')
    wrapper.instance().digitInputNodes.forEach((node, index) => {
      expect(node.classList.contains('hidden')).toBeFalsy()
      expect(
        wrapper.instance().digitMaskNodes[index].classList.contains('hidden')
      ).toBeTruthy()
    })
  })
})

describe('Autofocus', () => {
  test('Does not autoFocus by default', () => {
    jest.useFakeTimers()
    const wrapper = mount(<VerificationCode />)
    const input = wrapper.instance().digitInputNodes[0]
    jest.runAllTimers()
    const focusedElement = document.activeElement
    expect(focusedElement === input).toBeFalsy()
  })

  test('Autofocuses if specified', () => {
    jest.useFakeTimers()
    const wrapper = mount(<VerificationCode autoFocus />, {
      attachTo: container,
    })
    const input = wrapper.instance().digitInputNodes[0]
    jest.runAllTimers()
    const focusedElement = document.activeElement
    expect(focusedElement === input).toBeTruthy()
  })

  test('Autofocuses based on code length, if specified', () => {
    const code = '002'
    jest.useFakeTimers()
    const wrapper = mount(<VerificationCode autoFocus code={code} />, {
      attachTo: container,
    })
    const input = wrapper.instance().digitInputNodes[code.length - 1]
    jest.runAllTimers()
    const focusedElement = document.activeElement
    expect(focusedElement === input).toBeTruthy()
  })
})

describe('AutoSubmit', () => {
  test('should call onEnter when the number of character was reached', () => {
    const TEXT = '123456'

    const onEnterSpy = jest.fn()

    const eventMock = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      clipboardData: {
        getData: t => TEXT,
      },
    }
    const wrapper = mount(
      <VerificationCode autoSubmitPaste onEnter={onEnterSpy} />
    )

    wrapper.simulate('paste', eventMock)

    expect(onEnterSpy).toHaveBeenCalledWith(`${TEXT}`)
  })
})
