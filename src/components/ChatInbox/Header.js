import React from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Hr from '../Hr'
import Icon from '../Icon'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  avatars: PropTypes.node,
  count: PropTypes.number,
  isCollapsed: PropTypes.bool,
  isCollapsible: PropTypes.bool,
  onClick: PropTypes.func
}

const defaultProps = {
  isCollapsible: false,
  isCollapsed: false,
  onClick: noop
}

const Header = props => {
  const {
    avatars,
    className,
    count,
    children,
    isCollapsed,
    isCollapsible,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatInboxHeader',
    isCollapsible && 'is-collapsible',
    className
  )

  const countMarkup = count !== undefined ? (
    <Flexy.Item>
      <Heading className='c-ChatInboxHeader__count' light size='small'>
        ({count})
      </Heading>
    </Flexy.Item>
  ) : null

  const avatarsMarkup = avatars || null

  const collapseMarkup = (
    <Icon name='collapse' muted />
  )

  const actionMarkup = isCollapsible
    ? (isCollapsed ? collapseMarkup : avatarsMarkup)
    : avatarsMarkup

  const dividerMarkup = (<Hr size='none' />)

  return (
    <div className={componentClassName} {...rest}>
      <Flexy className='c-ChatInboxHeader__content' gap='md'>
        <Flexy.Block>
          <Flexy just='left' gap='xs'>
            <Flexy.Item>
              <Heading className='c-ChatInboxHeader__title' size='small'>
                {children}
              </Heading>
            </Flexy.Item>
            {countMarkup}
          </Flexy>
        </Flexy.Block>
        <Flexy.Item>
          <div className='c-ChatInboxHeader__action'>
            {actionMarkup}
          </div>
        </Flexy.Item>
      </Flexy>
      {isCollapsible
        ? (isCollapsed ? dividerMarkup : null)
        : dividerMarkup
      }
    </div>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps
Header.displayName = 'ChatInboxHeader'

export default Header
