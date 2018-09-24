// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Hr from '../Hr'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './utils'
import { HeaderUI, ContentUI } from './styles/Header.css.js'

type Props = {
  avatars?: any,
  count: number,
  isCollapsed: boolean,
  isCollapsible: boolean,
  onClick: (event: Event) => void,
}

class Header extends Component<Props> {
  static defaultProps = {
    count: 0,
    isCollapsible: false,
    isCollapsed: false,
    onClick: noop,
  }
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

namespaceComponent(COMPONENT_KEY.Header)(Header)

export default Header
