import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import Badge from '../Badge'
import Animate from '../Animate'
import Collapsible from '../Collapsible'
import CloseButton from '../CloseButton'
import Icon from '../Icon'
import {
  AlertUI,
  BadgeWrapperUI,
  BlockUI,
  CloseWrapperUI,
  ContentUI,
  IconWrapperUI,
  ActionRightUI,
} from './Alert.css'

export const classNameSpace = 'c-Alert'
export const cx = {
  main: classNameSpace,
  actionRight: `${classNameSpace}__actionRight`,
  badge: `${classNameSpace}__badge`,
  block: `${classNameSpace}__block`,
  closeButton: `${classNameSpace}__closeButton`,
  content: `${classNameSpace}__content`,
  icon: `${classNameSpace}__icon`,
}

export class Alert extends React.PureComponent {
  state = {
    dismissed: false,
  }

  handleOnDismiss = () => {
    this.setState({
      dismissed: true,
    })
    this.props.onDismiss()
  }

  getLeftContentMarkup = () => {
    const { badge, icon, status } = this.props

    const leftContentMarkup = badge ? (
      <BadgeWrapperUI className={cx.badge}>
        <Badge status={status}>{badge}</Badge>
      </BadgeWrapperUI>
    ) : icon ? (
      <IconWrapperUI className={cx.icon}>
        <Icon name="alert-small" size="24" />
      </IconWrapperUI>
    ) : null

    return leftContentMarkup
  }

  getContentMarkup = () => {
    const { actionRight, dismissible, children } = this.props

    const actionRightMarkup = actionRight && (
      <ActionRightUI className={cx.actionRight}>{actionRight}</ActionRightUI>
    )

    const closeButtonMarkup = dismissible && (
      <CloseWrapperUI className={cx.closeButton}>
        <CloseButton onClick={this.handleOnDismiss} seamless size="sm" />
      </CloseWrapperUI>
    )

    return (
      <ContentUI className={cx.content}>
        {this.getLeftContentMarkup()}
        <BlockUI className={cx.block}>{children}</BlockUI>
        {actionRightMarkup}
        {closeButtonMarkup}
      </ContentUI>
    )
  }

  render() {
    const {
      actionRight,
      badge,
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

    const componentClassName = classNames(
      cx.main,
      actionRight && 'has-actionRight',
      badge && 'has-badge',
      dismissible && 'is-dismissible',
      icon && 'has-icon',
      noMargin && 'is-noMargin',
      status && `is-${status}`,
      className
    )

    const componentMarkup = (
      <AlertUI
        role="alert"
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {this.getContentMarkup()}
      </AlertUI>
    )

    return dismissible ? (
      <Collapsible duration={200} isOpen={!dismissed}>
        <Animate in={!dismissed} sequence={['fade']} duration={100}>
          {componentMarkup}
        </Animate>
      </Collapsible>
    ) : (
      componentMarkup
    )
  }
}

Alert.defaultProps = {
  'data-cy': 'Alert',
  dismissible: false,
  icon: false,
  noMargin: false,
  onDismiss: noop,
  status: 'warning',
}

Alert.propTypes = {
  /** Renders an action-based element on the right side of the content. Typically Buttons. */
  actionRight: PropTypes.any,
  /** Renders a Badge component. */
  badge: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Allows this component to be dismissed by clicking a CloseButton. */
  dismissible: PropTypes.bool,
  /** Renders an alert Icon. */
  icon: PropTypes.bool,
  /** Removes margin from the bottom of the component. */
  noMargin: PropTypes.bool,
  /** Callback function when this component is dismissed. */
  onDismiss: PropTypes.func,
  /** Changes the color of the component to the corresponding status. */
  status: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
}

export default Alert
