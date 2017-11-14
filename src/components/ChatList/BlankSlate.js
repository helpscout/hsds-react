import React from 'react'
// import PropTypes from 'prop-types'
import Hr from '../Hr'
import Text from '../Text'
import classNames from '../../utilities/classNames'

const BlankSlate = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatListBlankSlate',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      <div className='c-ChatListBlankSlate__content'>
        <Text faint center size='13'>
          You're all caught-up
        </Text>
      </div>
      <Hr className='c-ChatListItem__divider' size='none' />
    </div>
  )
}

BlankSlate.displayName = 'ChatListBlankSlate'

export default BlankSlate
