import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import {
  VerificationCodeFieldUI,
  DigitInputUI,
  DigitMaskUI,
  InputUI,
} from './VerificationCode.css'

export default class VerificationCode extends React.Component {
  static propTypes = {}
  static defaultProps = {}

  getClassName() {
    const { className } = this.props
    return classNames('c-VerificationCode', className)
  }

  setFirstInputNode = node => {
    this.firstInputRef = node
  }

  handlePaste = e => {
    // console.log('TCL: VerificationCode -> e', e.target)
  }

  handleKeyUp = e => {
    // console.log('TCL: VerificationCode -> e', e.target)
  }

  handleFieldFocus = e => {
    if (
      !document.activeElement.classList.contains('VerificationCode-digitInput')
    ) {
      this.firstInputRef.focus()
    }
  }

  handleInputChange = e => {
    const { value } = e.target
    const digitMask = e.target.previousElementSibling

    digitMask.innerText = value
  }

  handleInputClick = e => {
    let inputs = document.querySelectorAll('.VerificationCode-digitInput')

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove('hidden')
    }

    e.target.select()
  }

  render() {
    return (
      <div>
        <button
          onClick={e => {
            let selection = window.getSelection()
            let masks = document.querySelectorAll('.VerificationCode-digitMask')
            let inputs = document.querySelectorAll(
              '.VerificationCode-digitInput'
            )

            if (selection.rangeCount > 0) {
              selection.removeAllRanges()
            }

            for (let i = 0; i < masks.length; i++) {
              inputs[i].classList.add('hidden')
              let range = document.createRange()
              range.selectNode(masks[i])
              selection.addRange(range)
            }
          }}
        >
          Select All
        </button>
        <VerificationCodeFieldUI
          className={this.getClassName()}
          onPaste={this.handlePaste}
          // onFocus={this.handleFieldFocus}
          onKeyUp={this.handleKeyUp}
          tabIndex="0"
        >
          <DigitInputUI>
            <DigitMaskUI className="VerificationCode-digitMask" />
            <InputUI
              className="VerificationCode-digitInput"
              maxLength="1"
              innerRef={this.setFirstInputNode}
              onClick={this.handleInputClick}
              onChange={this.handleInputChange}
            />
          </DigitInputUI>
          <DigitInputUI>
            <DigitMaskUI className="VerificationCode-digitMask" />
            <InputUI
              className="VerificationCode-digitInput"
              maxLength="1"
              onClick={this.handleInputClick}
              onChange={this.handleInputChange}
            />
          </DigitInputUI>
          <DigitInputUI>
            <DigitMaskUI className="VerificationCode-digitMask" />
            <InputUI
              className="VerificationCode-digitInput"
              maxLength="1"
              onClick={this.handleInputClick}
              onChange={this.handleInputChange}
            />
          </DigitInputUI>
          <DigitInputUI>
            <DigitMaskUI className="VerificationCode-digitMask" />
            <InputUI
              className="VerificationCode-digitInput"
              maxLength="1"
              onClick={this.handleInputClick}
              onChange={this.handleInputChange}
            />
          </DigitInputUI>
          <DigitInputUI>
            <DigitMaskUI className="VerificationCode-digitMask" />
            <InputUI
              className="VerificationCode-digitInput"
              maxLength="1"
              onClick={this.handleInputClick}
              onChange={this.handleInputChange}
            />
          </DigitInputUI>
          <DigitInputUI>
            <DigitMaskUI className="VerificationCode-digitMask" />
            <InputUI
              className="VerificationCode-digitInput"
              maxLength="1"
              onClick={this.handleInputClick}
              onChange={this.handleInputChange}
            />
          </DigitInputUI>
        </VerificationCodeFieldUI>
      </div>
    )
  }
}
