import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import CloseButton from '../CloseButton'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { statusTypes } from '../../constants/propTypes'

export const propTypes = {
  actionRight: PropTypes.element,
  badge: PropTypes.element,
  closeLabel: PropTypes.string,
  dismissible: PropTypes.bool,
  icon: PropTypes.bool,
  onDismiss: PropTypes.func,
  noMargin: PropTypes.bool,
  status: statusTypes
}

const defaultProps = {
  onDismiss: noop,
  status: 'warning'
}

export const classNameSpace = 'c-Alert'
export const cx = {
  main: classNameSpace,
  actionRight: `${classNameSpace}__actionRight`,
  block: `${classNameSpace}__block`,
  closeButton: `${classNameSpace}__closeButton`,
  content: `${classNameSpace}__content`,
  icon: `${classNameSpace}__icon`
}

class Alert extends Component {
  constructor () {
    super()
    this.state = {
      dismissed: false
    }
    this.handleOnDismiss = this.handleOnDismiss.bind(this)
  }

  handleOnDismiss () {
    const { onDismiss } = this.props
    this.setState({
      dismissed: true
    })
    onDismiss()
  }

  render () {
    const {
      actionRight,
      badge,
      closeLabel,
      dismissible,
      children,
      className,
      icon,
      onDismiss,
      noMargin,
      status,
      ...rest
    } = this.props
    const { dismissed } = this.state

    const handleOnDismiss = this.handleOnDismiss

    const componentClassName = classNames(
      cx.main,
      actionRight && 'has-actionRight',
      dismissible && 'is-dismissible',
      icon && 'has-icon',
      noMargin && 'is-noMargin',
      status && `is-${status}`,
      className
    )

    const actionRightMarkup = actionRight ? (
      <div className={cx.actionRight}>
        {actionRight}
      </div>
    ) : null

    const iconMarkup = icon ? (
      <div className={cx.icon}>
        <Icon name='alert' size='20' />
      </div>
    ) : null

    const closeButtonMarkup = dismissible ? (
      <div className={cx.closeButton}>
        <CloseButton
          onClick={handleOnDismiss}
          seamless
          size='sm'
        />
      </div>
    ) : null

    const componentMarkup = (
      <div className={componentClassName} {...rest} role='alert'>
        <div className={cx.content}>
          {iconMarkup}
          <div className={cx.block}>
            {children}
          </div>
          {actionRightMarkup}
          {closeButtonMarkup}
        </div>
      </div>
    )

    return (dismissible && !dismissed) || !dismissed ? componentMarkup : null
  }
}

Alert.propTypes = propTypes
Alert.defaultProps = defaultProps

export default Alert
