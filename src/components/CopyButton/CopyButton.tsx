import * as React from 'react'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'

import { noop } from '../../utilities/other'
import {
  CopyButtonUI,
  ConfirmationIconWrapperUI,
  TextUI,
} from './CopyButton.css'

export interface Props {
  canRenderFocus: boolean
  children?: any
  className?: string
  kind: string
  onClick: (event: Event) => void
  onReset: () => void
  resetTimeout: number
  size: any
  title?: string
}

export interface State {
  shouldRenderConfirmation: boolean
}

class CopyButton extends React.PureComponent<Props, State> {
  static defaultProps = {
    canRenderFocus: false,
    onClick: noop,
    onReset: noop,
    kind: 'secondary',
    resetTimeout: 2000,
  }

  state = {
    shouldRenderConfirmation: false,
  }

  _isMounted: boolean = false
  confirmationTimeout: any = null

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this.clearConfirmationTimeout()
    this._isMounted = false
  }

  safeSetState = (state: any) => {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(state)
    }
  }

  startConfirmationTimeout = () => {
    const { onReset, resetTimeout } = this.props

    this.safeSetState({
      shouldRenderConfirmation: true,
    })

    this.confirmationTimeout = setTimeout(() => {
      this.safeSetState({
        shouldRenderConfirmation: false,
      })
      onReset()
    }, resetTimeout)
  }

  clearConfirmationTimeout = () => {
    clearTimeout(this.confirmationTimeout)
  }

  handleOnClick = (event: Event) => {
    this.clearConfirmationTimeout()
    this.startConfirmationTimeout()
    this.props.onClick(event)
  }

  render() {
    const { className, kind, ...rest } = this.props
    const { shouldRenderConfirmation } = this.state

    const componentClassName = classNames(
      'c-CopyButton',
      shouldRenderConfirmation && 'is-copyConfirmed',
      className
    )

    return (
      <CopyButtonUI
        {...rest}
        kind={kind}
        onClick={this.handleOnClick}
        className={componentClassName}
      >
        <ConfirmationIconWrapperUI>
          <Icon
            className="c-CopyButton__iconConfirmation"
            name="checkmark"
            size="24"
          />
        </ConfirmationIconWrapperUI>
        <TextUI>Copy</TextUI>
      </CopyButtonUI>
    )
  }
}

export default CopyButton
