import * as React from 'react'
import { UIState } from '../../constants/types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { isStateful } from './Input.utils'
import { BackdropUI, FocusUI } from './styles/Input.BackdropV2.css'

type Props = {
  className?: string
  choiceKind?: string
  disabled: boolean
  isFilled: boolean
  isFocused: boolean
  isFirst: boolean
  isNotOnly: boolean
  isLast: boolean
  isSeamless: boolean
  kind?: string
  readOnly: boolean
  showFocus: boolean
  state?: UIState
}

class Backdrop extends React.PureComponent<Props> {
  static defaultProps = {
    disabled: false,
    isFilled: false,
    isFocused: false,
    readOnly: false,
    seamless: false,
    showFocus: true,
    state: 'default',
  }

  getComponentClassNames = () => {
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
      'c-InputBackdropV2',
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

  getFocusClassNames = () => {
    const { choiceKind, isFirst, isNotOnly, isLast } = this.props
    const isRadio = choiceKind === 'radio'

    return classNames(
      'c-InputBackdropV2__focus',
      isFirst && 'is-first',
      isNotOnly && 'is-notOnly',
      isLast && 'is-last',
      isRadio && 'is-radio',
      isStateful(this.props) && 'is-stateful'
    )
  }

  shouldShowFocus = () => {
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
        className={this.getComponentClassNames()}
        role="presentation"
      >
        {this.getFocusMarkup()}
      </BackdropUI>
    )
  }
}

export default Backdrop
