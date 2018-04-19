import React from 'react'
import PropTypes from 'prop-types'
import Hr from '../Hr'
import Illo from '../Illo'
import Text from '../Text'
import classNames from '../../utilities/classNames'

export const defaultMessage = 'You\'re all caught-up'

export const propTypes = {
  illoName: PropTypes.string
}
const defaultProps = {
  illoName: 'chatListBlankSlate'
}

const BlankSlate = props => {
  const {
    className,
    children,
    illoName,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatListBlankSlate',
    className
  )

  const message = children || defaultMessage

  const illoMarkup = illoName ? (
    <div className='c-ChatListBlankSlate__illo'>
      <Illo name={illoName} size='80' />
    </div>
  ) : null

  return (
    <div className={componentClassName} {...rest}>
      <div className='c-ChatListBlankSlate__content'>
        {illoMarkup}
        <Text faint size='13'>
          {message}
        </Text>
      </div>
      <Hr className='c-ChatListItem__divider' size='none' />
    </div>
  )
}

BlankSlate.propTypes = propTypes
BlankSlate.defaultProps = defaultProps
BlankSlate.displayName = 'ChatListBlankSlate'

export default BlankSlate
