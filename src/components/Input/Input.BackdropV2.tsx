import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { isStateful } from './Input.utils'
import { BackdropUI, FocusUI } from './styles/Input.BackdropV2.css'
import { InputBackdropV2Props } from './Input.types'

export class Backdrop extends React.PureComponent<InputBackdropV2Props> {
  static defaultProps = {
    disabled: false,
    isFilled: false,
    isFocused: false,
    readOnly: false,
    seamless: false,
    showFocus: true,
    state: 'default',
  }

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
      Backdrop.className,
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
      Backdrop.focusClassName,
      isFirst && 'is-first',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      // It's being tested, Istanbul not picking it up
      /* istanbul ignore next */
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

export default Backdrop
