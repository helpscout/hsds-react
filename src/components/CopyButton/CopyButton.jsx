import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import {
  CopyButtonUI,
  ConfirmationIconWrapperUI,
  TextUI,
  IconUI,
} from './CopyButton.css'

class CopyButton extends React.PureComponent {
  state = {
    shouldRenderConfirmation: false,
  }

  _isMounted = false
  confirmationTimeout = null

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this.clearConfirmationTimeout()
    this._isMounted = false
  }

  safeSetState = state => {
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

  handleOnClick = event => {
    this.clearConfirmationTimeout()
    this.startConfirmationTimeout()
    this.props.onClick(event)
  }

  render() {
    const { className, kind, size, icon, label, ...rest } = this.props
    const { shouldRenderConfirmation } = this.state

    const componentClassName = classNames(
      'c-CopyButton',
      shouldRenderConfirmation && 'is-copyConfirmed',
      icon && 'is-with-icon',
      className
    )
    const iconSize = size === 'sm' ? '20' : '24'

    return (
      <CopyButtonUI
        {...getValidProps(rest)}
        kind={kind}
        onClick={this.handleOnClick}
        size={size}
        className={componentClassName}
      >
        <ConfirmationIconWrapperUI>
          <Icon
            className="c-CopyButton__iconConfirmation"
            name="checkmark"
            size={iconSize}
          />
        </ConfirmationIconWrapperUI>
        {icon && <IconUI size={iconSize} name={icon} />}
        {label && <TextUI>{label}</TextUI>}
      </CopyButtonUI>
    )
  }
}

CopyButton.defaultProps = {
  canRenderFocus: false,
  'data-cy': 'CopyButton',
  kind: 'secondary',
  label: 'Copy',
  onClick: noop,
  onReset: noop,
  resetTimeout: 2000,
  size: 'sm',
}

CopyButton.propTypes = {
  canRenderFocus: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Applies the specified style to the button.
   * 'primary': Blue button. Used for primary actions.
   * 'primaryAlt': Purple button. Used for primary actions.
   * 'secondary': White button with a border. Used for secondary actions.
   * 'secondaryAlt': White button with a green border. Used for secondary actions.
   * 'default': Borderless button. Used for subtle/tertiary actions.
   * 'link': Button that looks like a `Link`. Used for subtle/tertiary actions.
   */
  kind: PropTypes.oneOf([
    'primary',
    'primaryAlt',
    'secondary',
    'secondaryAlt',
    'default',
    'link',
  ]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func,
  onReset: PropTypes.func,
  resetTimeout: PropTypes.number,
  /** Sets the size of the button. Can be one of `"sm"`, `"md"` or `"lg"`. */
  size: PropTypes.any,
  title: PropTypes.string,
}

export default CopyButton
