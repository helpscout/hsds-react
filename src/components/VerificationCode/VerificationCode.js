import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { copyToClipboard } from '../../utilities/clipboard'
import { noop } from '../../utilities/other'
import {
  selectAll,
  clearAll,
  getCleanSelectedText,
  getCurrentCodeValue,
  showInputDigits,
  CLASSNAMES,
} from './VerificationCode.utils'
import {
  VerificationCodeFieldUI,
  DigitInputWrapperUI,
  DigitMaskUI,
  DigitInputUI,
  ClipboardPlaceholderUI,
  IconUI,
  ValidIconUI,
} from './VerificationCode.css'
import Tooltip from '../Tooltip'

export default class VerificationCode extends React.Component {
  static propTypes = {
    isValid: PropTypes.bool,
    numberOfChars: PropTypes.number,
    onEnter: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    isValid: true,
    numberOfChars: 6,
    onEnter: noop,
    onChange: noop,
  }

  componentDidMount() {
    this.digitInputNodes = this.verificationCodeFieldRef.querySelectorAll(
      '.DigitInput'
    )
    this.digitMaskNodes = this.verificationCodeFieldRef.querySelectorAll(
      '.DigitMask'
    )
  }

  getClassName() {
    const { className, isValid } = this.props

    return classNames('c-VerificationCode', !isValid && 'not-valid', className)
  }

  setVerificationCodeFieldNode = node => {
    this.verificationCodeFieldRef = node
  }

  setClipboardPlaceholderNode = node => {
    this.clipboardPlaceholderRef = node
  }

  handlePaste = e => {
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('Text')

    e.stopPropagation()
    e.preventDefault()

    if (pastedData.length > 0) {
      pastedData
        .slice(0, 6)
        .split('')
        .forEach((char, index, arr) => {
          if (this.digitInputNodes.length > 0) {
            this.digitInputNodes[index].value = char
            this.digitMaskNodes[index].innerText = char

            if (index === arr.length - 1) {
              this.digitInputNodes[index].focus()
            }
          }
        })
    }
  }

  handleKeyDown = e => {
    const { key, metaKey, ctrlKey } = e

    if ((metaKey || ctrlKey) && key === 'a') {
      selectAll(this.digitInputNodes, this.digitMaskNodes)
    } else if ((metaKey || ctrlKey) && key === 'c') {
      const selectionText = getCleanSelectedText()

      this.clipboardPlaceholderRef.value = selectionText
      this.clipboardPlaceholderRef.select()
      copyToClipboard()
      selectAll(this.digitInputNodes, this.digitMaskNodes)
    } else if (key === 'Enter') {
      const { onEnter } = this.props
      const code = this.digitInputNodes
        .map(input => input.value)
        .join('')
        .trim()

      onEnter(code)
    }
  }

  handleInputKeyUp = (index, e) => {
    const { key } = e

    if (key !== 'Meta') {
      const { value } = e.target
      const { numberOfChars, onChange } = this.props
      const digitMask = this.digitMaskNodes[index]

      if (key === 'Backspace') {
        let selectionText = getCleanSelectedText()

        if (selectionText.length > 1) {
          clearAll(this.digitInputNodes, this.digitMaskNodes)
          showInputDigits(this.digitInputNodes, this.digitMaskNodes)
          this.digitInputNodes[0].focus()
          onChange('')
        } else {
          const previousDigit = this.digitInputNodes[
            index === 0 ? 0 : index - 1
          ]

          previousDigit && previousDigit.select()
          digitMask.innerText = value
          onChange(getCurrentCodeValue(this.digitInputNodes))
        }
      } else if (key.length === 1) {
        // all chars have a length of 1, special keys have more
        const nextDigit = this.digitInputNodes[
          index === numberOfChars - 1 ? numberOfChars : index + 1
        ]
        nextDigit && nextDigit.focus()
        digitMask.innerText = value

        onChange(getCurrentCodeValue(this.digitInputNodes))
      }
    }
  }

  handleInputClick = e => {
    showInputDigits(this.digitInputNodes, this.digitMaskNodes)
    e.target.select()
  }

  render() {
    const { numberOfChars, isValid } = this.props

    return (
      <VerificationCodeFieldUI
        className={this.getClassName()}
        innerRef={this.setVerificationCodeFieldNode}
        onPaste={this.handlePaste}
        onKeyDown={this.handleKeyDown}
      >
        <ClipboardPlaceholderUI
          readOnly={true}
          tabIndex="-1"
          innerRef={this.setClipboardPlaceholderNode}
        />
        {Array(numberOfChars)
          .fill(0)
          .map((_, index) => {
            return (
              <DigitInputWrapperUI
                className="DigitInputWrapper"
                key={`DigitInput-${index}`}
              >
                <DigitMaskUI className={`DigitMask ${CLASSNAMES.hidden}`} />
                <DigitInputUI
                  className="DigitInput"
                  maxLength="1"
                  onClick={this.handleInputClick}
                  onKeyUp={e => {
                    this.handleInputKeyUp(index, e)
                  }}
                />
              </DigitInputWrapperUI>
            )
          })}
        {!isValid ? (
          <ValidIconUI>
            <Tooltip
              animationDelay={0}
              animationDuration={0}
              display="block"
              placement="top-end"
              title="Invalid verification code"
            >
              <IconUI name="alert" size={24} />
            </Tooltip>
          </ValidIconUI>
        ) : null}
      </VerificationCodeFieldUI>
    )
  }
}
