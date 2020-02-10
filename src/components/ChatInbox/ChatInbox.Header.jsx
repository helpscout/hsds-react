import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Hr from '../Hr'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { HeaderUI, ContentUI } from './ChatInbox.css.js'

class Header extends React.PureComponent {
  static propTypes = {
    avatars: PropTypes.any,
    className: PropTypes.string,
    count: PropTypes.number,
    isCollapsed: PropTypes.bool,
    isCollapsible: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    count: 0,
    isCollapsible: false,
    isCollapsed: false,
    onClick: noop,
  }

  static displayName = 'ChatInboxHeader'

  render() {
    const {
      avatars,
      className,
      count,
      children,
      isCollapsed,
      isCollapsible,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-ChatInboxHeader',
      isCollapsible && 'is-collapsible',
      className
    )

    const countMarkup = count ? (
      <Flexy.Item className="c-ChatInboxHeader__count">
        <Heading light size="small">
          ({count})
        </Heading>
      </Flexy.Item>
    ) : null

    const avatarsMarkup = avatars || null

    const closeMarkup = <Icon name="collapse" muted />

    const actionMarkup = isCollapsible
      ? !isCollapsed
        ? closeMarkup
        : avatarsMarkup
      : avatarsMarkup

    const dividerMarkup = <Hr size="none" />

    return (
      <HeaderUI {...getValidProps(rest)} className={componentClassName}>
        <ContentUI className="c-ChatInboxHeader__content" gap="md">
          <Flexy.Block>
            <Flexy just="left" gap="xs">
              <Flexy.Item>
                <Heading className="c-ChatInboxHeader__title" size="small">
                  {children}
                </Heading>
              </Flexy.Item>
              {countMarkup}
            </Flexy>
          </Flexy.Block>
          <Flexy.Item>
            <div className="c-ChatInboxHeader__action">{actionMarkup}</div>
          </Flexy.Item>
        </ContentUI>
        {isCollapsible ? (!isCollapsed ? dividerMarkup : null) : dividerMarkup}
      </HeaderUI>
    )
  }
}

export default Header
