import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { copyToClipboard } from '../../utilities/clipboard'
import {
  selectAll,
  clearAll,
  getCleanSelectedText,
  showInputDigits,
  CLASSNAMES,
} from './VerificationCode.utils'
import {
  VerificationCodeFieldUI,
  DigitInputWrapperUI,
  DigitMaskUI,
  DigitInputUI,
  ClipboardPlaceholderUI,
} from './VerificationCode.css'

export default class VerificationCode extends React.Component {
  static propTypes = {
    charactersRegex: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    numberOfChars: PropTypes.number,
  }

  static defaultProps = {
    charactersRegex: /^\d+$/,
    numberOfChars: 6,
  }

  componentDidMount() {
    this.digitInputNodes = [...document.querySelectorAll('.DigitInput')]
    this.digitMaskNodes = [...document.querySelectorAll('.DigitMask')]
  }

  getClassName() {
    const { className } = this.props

    return classNames('c-VerificationCode', className)
  }

  setClipboardPlaceholderNode = node => {
    this.clipboardPlaceholderRef = node
  }

  handlePaste = e => {
    const { numberOfChars } = this.props
    const regex = new RegExp(this.props.charactersRegex)
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('Text')

    e.stopPropagation()
    e.preventDefault()

    if (regex.test(pastedData) && pastedData.length === numberOfChars) {
      this.digitInputNodes.forEach((digitInput, index) => {
        digitInput.value = pastedData.charAt(index)
        this.digitMaskNodes[index].innerText = pastedData.charAt(index)

        if (index === numberOfChars - 1) {
          digitInput.focus()
        }
      })
    }
  }

  handleKeyDown = e => {
    const { key, metaKey } = e

    if (metaKey && key === 'a') {
      selectAll(this.digitInputNodes, this.digitMaskNodes)
    } else if (metaKey && key === 'c') {
      let selectionText = getCleanSelectedText()

      this.clipboardPlaceholderRef.value = selectionText
      this.clipboardPlaceholderRef.select()
      copyToClipboard()
      selectAll(this.digitInputNodes, this.digitMaskNodes)
    }
  }

  handleInputKeyUp = (index, e) => {
    const { key } = e

    if (key === 'Meta') return

    const { value } = e.target
    const { numberOfChars, charactersRegex } = this.props
    const digitMask = this.digitMaskNodes[index]
    const regex = new RegExp(charactersRegex)

    if (key === 'Backspace') {
      let selectionText = getCleanSelectedText()

      if (selectionText.length > 1) {
        clearAll(this.digitInputNodes, this.digitMaskNodes)
        showInputDigits(this.digitInputNodes, this.digitMaskNodes)
        this.digitInputNodes[0].select()
      } else {
        const previousDigit = this.digitInputNodes[index === 0 ? 0 : index - 1]

        previousDigit && previousDigit.select()
        digitMask.innerText = value
      }
    } else if (regex.test(value)) {
      const nextDigit = this.digitInputNodes[
        index === numberOfChars - 1 ? numberOfChars : index + 1
      ]

      nextDigit && nextDigit.focus()
      digitMask.innerText = value
    }
  }

  handleInputClick = e => {
    showInputDigits(this.digitInputNodes, this.digitMaskNodes)
    e.target.select()
  }

  render() {
    const { numberOfChars } = this.props

    return (
      <div>
        <VerificationCodeFieldUI
          className={this.getClassName()}
          onPaste={this.handlePaste}
          onKeyDown={this.handleKeyDown}
        >
          <ClipboardPlaceholderUI
            readOnly
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
        </VerificationCodeFieldUI>
      </div>
    )
  }
}
