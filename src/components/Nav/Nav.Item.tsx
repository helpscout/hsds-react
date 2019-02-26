import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import NavLink from '../NavLink'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  ItemUI,
  ContentUI,
  GhostTitleUI,
  TitleUI,
  IndicatorUI,
  ErrorWrapperUI,
} from './Nav.css'
import { ITEM_COMPONENT_KEY } from './Nav.utils'

export interface Props {
  className?: string
  children?: any
  disabled: boolean
  error: string
  exact: boolean
  innerRef: (node: HTMLElement) => void
}

export class Item extends React.Component<Props> {
  static className = 'c-NavItem'
  static defaultProps = {
    disabled: false,
    error: '',
    exact: true,
    innerRef: noop,
  }

  getClassName() {
    const { className, disabled } = this.props
    return classNames(Item.className, disabled && 'is-disabled', className)
  }

  getLinkProps() {
    const { exact, isActive, location, strict, to } = this.props

    return {
      exact,
      isActive,
      location,
      strict,
      to,
    }
  }

  renderError() {
    const { error } = this.props
    if (!error) return

    return (
      <ErrorWrapperUI>
        <Tooltip title={error}>
          <Icon name="alert" state="error" />
        </Tooltip>
      </ErrorWrapperUI>
    )
  }

  renderContent = ({ isActive }) => {
    const { children } = this.props
    const componentClassName = classNames(
      'c-NavItemContent',
      isActive && 'is-active'
    )

    return (
      <ContentUI className={componentClassName}>
        <Flexy gap="xs">
          <Flexy.Block>
            <TitleUI
              size="13"
              lineHeightReset
              isActive={isActive}
              className="c-NavItemTitle"
            >
              {children}
            </TitleUI>
            <GhostTitleUI
              size="13"
              lineHeightReset
              aria-hidden
              className="c-NavItemTitleGhost"
            >
              {children}
            </GhostTitleUI>
          </Flexy.Block>
          {this.renderError()}
        </Flexy>
        <IndicatorUI className="c-NavItemIndicator" isActive={isActive} />
      </ContentUI>
    )
  }

  render() {
    const { children, href, innerRef, to, ...rest } = this.props

    return (
      <ItemUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <NavLink
          {...this.getLinkProps()}
          className="c-NavItemLink"
          render={this.renderContent}
        />
      </ItemUI>
    )
  }
}

const PropConnectedComponent = propConnect(ITEM_COMPONENT_KEY, { pure: false })(
  Item
)

export default PropConnectedComponent
