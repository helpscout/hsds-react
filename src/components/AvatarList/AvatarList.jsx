import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import Avatar from '../Avatar'
import { ItemUI, AvatarListUI, AvatarListWrapperUI } from './AvatarList.css'
import classNames from 'classnames'
import { getComponentKey } from '../../utilities/component'
import { isOdd, getMiddleIndex } from '../../utilities/number'

export const AvatarListContext = React.createContext({})

const wrapAvatar = (props, avatar, index) => {
  const {
    animationDuration,
    animationEasing,
    animationSequence,
    max,
    stack,
    count,
  } = props

  let zIndex = max - index

  if (stack === 'horizontal') {
    if (count > 2 && isOdd(count)) {
      if (isOdd(index)) {
        zIndex = zIndex + 1
      }

      if (index === getMiddleIndex(count)) {
        zIndex = zIndex + 2
      }
    }
  } else if (stack === 'vertical') {
    zIndex = index + 1
  }

  return (
    <ItemUI key={getComponentKey(avatar, index)} zIndex={zIndex}>
      <Animate
        className="c-AvatarList__item"
        duration={animationDuration}
        easing={animationEasing}
        sequence={animationSequence}
      >
        {avatar}
      </Animate>
    </ItemUI>
  )
}

const getCurrentCount = ({ count, max }) => (count < max ? count : max)

export const getAvatarSize = ({ size: sizeProp, stack, ...rest }) => {
  const currentCount = getCurrentCount(rest)

  if (stack !== 'horizontal') return sizeProp

  let size = 'md'

  if (currentCount === 2) {
    size = 'lg'
  }
  if (currentCount === 1) {
    size = 'xl'
  }

  return size
}

export const AvatarList = props => {
  const {
    children,
    max,
    className,
    center,
    stack,
    grid,
    extraTooltipProps,
    ...rest
  } = props
  const avatars = React.Children.toArray(children)
  const avatarList =
    max && avatars.length > max ? avatars.slice(0, max - 1) : avatars
  const extraAvatarCount = avatars.length - avatarList.length
  const shouldShowExtra = extraAvatarCount > 0

  const propsWithCount = { ...props, count: avatars.length }

  const size = getAvatarSize(propsWithCount)

  const contextValue = { size }

  const avatarComponents = avatarList.map((avatar, index) => {
    return wrapAvatar(propsWithCount, avatar, index)
  })

  if (shouldShowExtra) {
    const extraLabel = `+${extraAvatarCount}`

    avatarComponents.push(
      wrapAvatar(
        propsWithCount,
        <Avatar
          count={extraLabel}
          light
          name={extraLabel}
          tooltipProps={extraTooltipProps}
        />,
        avatarList.length
      )
    )
  }

  const componentClassName = classNames(
    'c-AvatarList',
    stack && 'is-withLayerStack',
    stack === 'horizontal' && 'horizontally-stacked',
    stack === 'vertical' && 'vertically-stacked',
    grid && 'is-grid',
    className
  )
  const componentWrapperClassName = classNames(
    'c-AvatarListWrapper',
    center && 'is-center'
  )

  return (
    <AvatarListWrapperUI className={componentWrapperClassName}>
      <AvatarListContext.Provider value={contextValue}>
        <AvatarListUI {...getValidProps(rest)} className={componentClassName}>
          {avatarComponents}
        </AvatarListUI>
      </AvatarListContext.Provider>
    </AvatarListWrapperUI>
  )
}

AvatarList.defaultProps = {
  animationEasing: 'ease',
  animationSequence: 'fade',
  'data-cy': 'AvatarList',
  max: 4,
  grid: false,
  center: false,
  showStatusBorderColor: false,
  size: 'sm',
}

AvatarList.propTypes = {
  /** Duration of animation */
  animationDuration: PropTypes.number,
  /** Easing of animation applied to the child `Avatars`. */
  animationEasing: PropTypes.string,
  /** Style of animation applied to the child `Avatars`. */
  animationStagger: PropTypes.number,
  /** Amount (in `ms`) to stagger the animation of the `Avatars`. */
  animationSequence: PropTypes.string,
  /** Custom className to pass to `Avatars`. */
  avatarsClassName: PropTypes.string,
  /** Color for the Avatar border. */
  borderColor: PropTypes.string,
  /** Center Avatars */
  center: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** To add a Tooltip to the "extra" avatar, accepts all Tooltip props */
  extraTooltipProps: PropTypes.object,
  /** Display as grid (previously AvatarGrid) */
  grid: PropTypes.bool,
  /** Number of avatars to display before truncating. */
  max: PropTypes.number,
  /** Color for the Avatar's outer border. */
  outerBorderColor: PropTypes.string,
  /** Shape of the avatars. */
  shape: PropTypes.string,
  /** Renders the `StatusDot` border. */
  showStatusBorderColor: PropTypes.bool,
  /** Size of the avatars. */
  size: PropTypes.string,
  /** Display as stack (previously AvatarStack) */
  stack: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default AvatarList
