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
} from './styles/Nav.css'
import { ITEM_COMPONENT_KEY } from './Nav.utils'

export interface Props {
  children?: any
  className?: string
  disabled: boolean
  error: string
  exact: boolean
  href?: string
  ref: (node: HTMLElement) => void
  isActive?: any
  location?: any
  to?: string
  strict?: boolean
}

export class Item extends React.Component<Props> {
  static className = 'c-NavItem'
  static contentClassName = 'c-NavItemContent'
  static defaultProps = {
    disabled: false,
    error: '',
    exact: true,
    ref: noop,
  }

  getClassName() {
    const { className, disabled } = this.props
    return classNames(Item.className, disabled && 'is-disabled', className)
  }

  getLinkProps() {
    const { disabled, exact, isActive, location, strict, to } = this.props

    return {
      disabled,
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
        <Tooltip data-cy="NavItemErrorTooltip" title={error}>
          <Icon
            data-cy="NavItemErrorIcon"
            name="alert"
            state="error"
            className="c-NavItemErrorIcon"
          />
        </Tooltip>
      </ErrorWrapperUI>
    )
  }

  renderContent = ({ isActive }) => {
    const { children } = this.props
    const componentClassName = classNames(
      Item.contentClassName,
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
    const { children, href, ref, to, ...rest } = this.props

    return (
      <ItemUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={ref as any}
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
