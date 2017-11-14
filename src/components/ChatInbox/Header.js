import React from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Hr from '../Hr'
import classNames from '../../utilities/classNames'

export const propTypes = {
  avatars: PropTypes.node,
  count: PropTypes.number
}

const Header = props => {
  const {
    avatars,
    className,
    count,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatInboxHeader',
    className
  )

  const countMarkup = count !== undefined ? (
    <Flexy.Item>
      <Heading className='c-ChatInboxHeader__count' light size='small'>
        ({count})
      </Heading>
    </Flexy.Item>
  ) : null

  const avatarsMarkup = avatars ? (
    <Flexy.Item className='c-ChatInboxHeader__avatars'>
      {avatars}
    </Flexy.Item>
  ) : null

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
        {avatarsMarkup}
      </Flexy>
      <Hr size='none' />
    </div>
  )
}

Header.propTypes = propTypes
Header.displayName = 'ChatInboxHeader'

export default Header
