import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import {
  ItemUI,
  ContentUI,
  GhostTitleUI,
  TitleUI,
  IndicatorUI,
  ErrorWrapperUI,
} from './Nav.css'

import { NavLink } from 'react-router-dom'

export class NavItem extends React.Component {
  static className = 'c-NavItem'
  static contentClassName = 'c-NavItemContent'

  getClassName() {
    const { className, disabled } = this.props
    return classNames(NavItem.className, disabled && 'is-disabled', className)
  }

  getLinkProps() {
    const {
      disabled,
      exact,
      isActive,
      location,
      strict,
      to,
      'data-bypass': dataBypass,
    } = this.props

    return {
      disabled,
      exact,
      isActive,
      location,
      strict,
      to,
      'data-bypass': dataBypass,
    }
  }

  renderError() {
    const { error } = this.props
    if (!error) return

    return (
      <ErrorWrapperUI>
        <Tooltip
          data-cy="NavItemErrorTooltip"
          title={error}
          appendTo={document.body}
        >
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

  renderContent = () => {
    const { children } = this.props
    const componentClassName = classNames(NavItem.contentClassName)

    return (
      <ContentUI className={componentClassName}>
        <Flexy gap="xs">
          <Flexy.Block>
            <TitleUI size="13" lineHeightReset className="c-NavItemTitle">
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
        <IndicatorUI className="c-NavItemIndicator" />
      </ContentUI>
    )
  }

  render() {
    const { children, href, innerRef, to, ...rest } = this.props

    return (
      <ItemUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      >
        <NavLink
          {...this.getLinkProps()}
          activeClassName="is-active"
          className="c-NavItemLink"
          isActive={this.props.isActive || null}
        >
          {this.renderContent()}
        </NavLink>
      </ItemUI>
    )
  }
}

NavItem.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Disables the link. */
  disabled: PropTypes.bool,
  /** Renders an error UI and message within a [Tooltip](../../Tooltip). */
  error: PropTypes.string,
  /** Used to determine the active state/className. */
  exact: PropTypes.bool,
  /** Hyperlink location. */
  href: PropTypes.string,
  /** Determines the active state. */
  isActive: PropTypes.any,
  /** Location object from [react-router](https://github.com/ReactTraining/react-router). */
  location: PropTypes.any,
  /** Route location for [react-router](https://github.com/ReactTraining/react-router). */
  to: PropTypes.string,
  /** Route strictness for [react-router](https://github.com/ReactTraining/react-router). */
  strict: PropTypes.bool,
  innerRef: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Data attr for bypassing external router handler. */
  'data-bypass': PropTypes.bool,
}

NavItem.defaultProps = {
  'data-cy': 'NavItem',
  disabled: false,
  error: '',
  exact: true,
  innerRef: noop,
}
export default NavItem
