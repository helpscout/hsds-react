import * as React from 'react'
import { UIStatus } from '../../constants/types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'

import Badge from '../Badge'
import Animate from '../Animate'
import Collapsible from '../Collapsible'
import CloseButton from '../CloseButton'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import {
  AlertUI,
  BadgeWrapperUI,
  BlockUI,
  CloseWrapperUI,
  ContentUI,
  IconWrapperUI,
} from './Alert.css'

export interface Props {
  actionRight?: any
  badge?: string
  className?: string
  closeLabel?: string
  dismissible: boolean
  icon: boolean
  noMargin: boolean
  onDismiss: () => void
  status: UIStatus
}

export interface State {
  dismissed: boolean
}

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

export class Alert extends React.PureComponent<Props, State> {
  static defaultProps = {
    dismissible: false,
    icon: false,
    noMargin: false,
    onDismiss: noop,
    status: 'warning',
  }

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
        <Icon name="alert" size="20" />
      </IconWrapperUI>
    ) : null

    return leftContentMarkup
  }

  getContentMarkup = () => {
    const { actionRight, dismissible, children } = this.props

    const actionRightMarkup = actionRight && (
      <div className={cx.actionRight}>{actionRight}</div>
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

export default Alert
