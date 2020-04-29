import * as React from 'react'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import {
  CopyButtonUI,
  ConfirmationIconWrapperUI,
  ContentWrapperUI,
} from './styles/CopyButton.css.js'
import { COMPONENT_KEY } from './CopyButton.utils'
import { ButtonSize } from '../Button/Button.types'

export interface Props {
  canRenderFocus: boolean
  children?: any
  className?: string
  kind: string
  onClick: (event: Event) => void
  onReset: () => void
  resetTimeout: number
  size: ButtonSize
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
    kind: 'tertiary',
    resetTimeout: 1500,
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
    const { className, kind, size, ...rest } = this.props
    const { shouldRenderConfirmation } = this.state

    const componentClassName = classNames(
      'c-CopyButton',
      shouldRenderConfirmation && 'is-copyConfirmed',
      className
    )

    const wrapperClassName = classNames(
      'c-CopyButton__contentWrapper',
      shouldRenderConfirmation && 'is-copyConfirmed'
    )

    const iconSize = size === 'sm' ? 'tick-small' : 'tick-large'

    return (
      <CopyButtonUI
        {...rest}
        className={componentClassName}
        kind={kind}
        onClick={this.handleOnClick}
        size={size}
        version={2}
      >
        <ConfirmationIconWrapperUI className={wrapperClassName}>
          <Icon className="c-CopyButton__iconConfirmation" name={iconSize} />
        </ConfirmationIconWrapperUI>
        <ContentWrapperUI className={wrapperClassName}>Copy</ContentWrapperUI>
      </CopyButtonUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CopyButton)

export default CopyButton
