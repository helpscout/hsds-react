// @flow
import type { UIStatus } from '../../constants/types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Badge from '../Badge'
import Animate from '../Animate'
import Collapsible from '../Collapsible'
import CloseButton from '../CloseButton'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './utils'
import {
  AlertUI,
  BadgeWrapperUI,
  BlockUI,
  CloseWrapperUI,
  ContentUI,
  IconWrapperUI,
} from './styles/Alert.css.js'

export interface Props {
  actionRight?: any;
  badge?: string;
  dismissible: boolean;
  icon: boolean;
  noMargin: boolean;
  onDismiss: () => void;
  status: UIStatus;
}

export interface State {
  dismissed: boolean;
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

export class Alert extends Component<Props, State> {
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
        {...getValidProps(rest)}
        className={componentClassName}
        role="alert"
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

namespaceComponent(COMPONENT_KEY)(Alert)

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Alert)

export default PropConnectedComponent
