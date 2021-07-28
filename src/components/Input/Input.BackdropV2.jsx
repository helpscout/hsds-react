import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { isStateful } from './Input.utils'
import { BackdropUI, FocusUI } from './Input.BackdropV2.css'

export class InputBackdropV2 extends React.PureComponent {
  static className = 'c-InputBackdropV2'
  static focusClassName = 'c-InputBackdropV2__focus'

  getClassName() {
    const {
      choiceKind,
      className,
      disabled,
      isFilled,
      isFirst,
      isNotOnly,
      isLast,
      isSeamless,
      kind,
      readOnly,
      state,
    } = this.props

    return classNames(
      InputBackdropV2.className,
      choiceKind && `is-${choiceKind}`,
      disabled && 'is-disabled',
      isFilled && 'is-filled',
      this.shouldShowFocus() && 'is-focused',
      isFirst && 'is-first',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      isSeamless && 'is-seamless',
      kind && `is-${kind}`,
      readOnly && 'is-readonly',
      state && `is-${state}`,
      className
    )
  }

  getFocusClassNames() {
    const { choiceKind, isFirst, isNotOnly, isLast, state } = this.props
    const isRadio = choiceKind === 'radio'

    return classNames(
      InputBackdropV2.focusClassName,
      isFirst && 'is-first',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      // It's being tested, Istanbul not picking it up

      isRadio && 'is-radio',
      isStateful(this.props) && 'is-stateful',
      state && `is-${state}`
    )
  }

  shouldShowFocus() {
    const { isSeamless, isFocused, showFocus } = this.props

    return !isSeamless && isFocused && showFocus
  }

  getFocusMarkup = () => {
    return (
      this.shouldShowFocus() && (
        <FocusUI className={this.getFocusClassNames()} />
      )
    )
  }

  render() {
    return (
      <BackdropUI
        {...getValidProps(this.props)}
        className={this.getClassName()}
        role="presentation"
      >
        {this.getFocusMarkup()}
      </BackdropUI>
    )
  }
}

InputBackdropV2.defaultProps = {
  'data-cy': 'InputBackdropV2',
  disabled: false,
  isFilled: false,
  isFocused: false,
  readOnly: false,
  seamless: false,
  showFocus: true,
  state: 'default',
}

InputBackdropV2.propTypes = {
  className: PropTypes.string,
  choiceKind: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  disabled: PropTypes.bool,
  isFilled: PropTypes.bool,
  isFocused: PropTypes.bool,
  isFirst: PropTypes.bool,
  isNotOnly: PropTypes.bool,
  isLast: PropTypes.bool,
  isSeamless: PropTypes.bool,
  kind: PropTypes.string,
  readOnly: PropTypes.bool,
  showFocus: PropTypes.bool,
  state: PropTypes.string,
}

export default InputBackdropV2
