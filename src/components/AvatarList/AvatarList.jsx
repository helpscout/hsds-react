import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Avatar from '../Avatar'
import Animate from '../Animate'
import List from '../List'
import { classNames } from '../../utilities/classNames'
import { getComponentKey } from '../../utilities/component'

export const AvatarListContext = React.createContext({})

const wrapAvatar = (props, avatar, index) => {
  const { animationDuration, animationEasing, animationSequence } = props
  return (
    <List.Item key={getComponentKey(avatar, index)}>
      <Animate
        className="c-AvatarList__item"
        duration={animationDuration}
        easing={animationEasing}
        sequence={animationSequence}
      >
        {avatar}
      </Animate>
    </List.Item>
  )
}

export const AvatarList = props => {
  const { children, max, size, className, center, ...rest } = props
  const avatars = React.Children.toArray(children)
  const avatarList =
    max && avatars.length > max ? avatars.slice(0, max - 1) : avatars
  const extraAvatarCount = avatars.length - avatarList.length
  const shouldShowExtra = extraAvatarCount > 0

  const contextValue = { size }

  const avatarComponents = avatarList.map((avatar, index) => {
    //TODO: stacking
    return wrapAvatar(props, avatar, index)
  })

  if (shouldShowExtra) {
    const extraLabel = `+${extraAvatarCount}`
    avatarComponents.push(
      wrapAvatar(
        props,
        <Avatar count={extraLabel} light name={extraLabel} />,
        avatarList.length
      )
    )
  }
  const componentClassName = classNames('c-AvatarList', className)
  const componentWrapperClassName = classNames(
    'c-AvatarListWrapper',
    center && 'is-center'
  )
  return (
    <div className={componentWrapperClassName}>
      <AvatarListContext.Provider value={contextValue}>
        <List
          {...getValidProps(rest)}
          className={componentClassName}
          display="flex"
          inlineSize="sm"
          type="inline"
          size="xs"
        >
          {avatarComponents}
        </List>
      </AvatarListContext.Provider>
    </div>
  )
}

AvatarList.propTypes = {
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  animationSequence: PropTypes.string,
  avatarsClassName: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  max: PropTypes.number,
  multiline: PropTypes.bool,
  size: PropTypes.string,
  stack: PropTypes.bool,
  center: PropTypes.bool,
}

AvatarList.defaultProps = {
  animationEasing: 'ease',
  animationSequence: 'fade',
  max: 4,
  multiline: false,
  center: false,
  showStatusBorderColor: false,
  size: 'sm',
  stack: false,
}

export default AvatarList
