/* istanbul ignore file */
// Deprecated component, use AvatarList instead
import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { AvatarListContext } from '../AvatarList/AvatarList'
import { classNames } from '../../utilities/classNames'
import { getComponentKey } from '../../utilities/component'
import { isOdd, getMiddleIndex } from '../../utilities/number'
import { AvatarStackLayeringUI, ItemUI } from './AvatarStack.css'
import Animate from '../Animate'

export class AvatarStack extends React.PureComponent {
  getAvatars = () => {
    return React.Children.toArray(this.props.children)
  }

  getTotalAvatarCount() {
    return this.getAvatars().length
  }

  getCurrentAvatarCount = () => {
    const { max } = this.props
    const count = this.getTotalAvatarCount()

    return count < max ? count : max
  }

  getAvatarList() {
    const { max } = this.props

    const avatars = this.getAvatars()
    const totalAvatarCount = avatars.length
    const sliceAt = max

    const avatarList =
      max && totalAvatarCount > max ? avatars.slice(0, sliceAt) : avatars

    return avatarList
  }

  getAvatarSize = () => {
    const currentCount = this.getCurrentAvatarCount()

    let size = 'md'

    if (currentCount === 2) {
      size = 'lg'
    }
    if (currentCount === 1) {
      size = 'xl'
    }

    return size
  }

  getAvatarPropsFromIndex = index => {
    const {
      avatarsClassName,
      borderColor,
      outerBorderColor,
      shape,
      showStatusBorderColor,
    } = this.props

    return {
      borderColor,
      className: classNames(avatarsClassName, 'c-AvatarStack__avatar'),
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size: this.getAvatarSize(),
      withShadow: true,
    }
  }

  getAvatarStyleFromIndex = index => {
    const { max } = this.props
    const currentCount = this.getCurrentAvatarCount()
    let zIndex = max - index

    if (currentCount > 2 && isOdd(`${currentCount}`)) {
      if (isOdd(index)) {
        zIndex = zIndex + 1
      }
      if (index === getMiddleIndex(`${currentCount}`)) {
        zIndex = zIndex + 2
      }
    }

    return {
      zIndex,
    }
  }

  renderAvatars() {
    const { animationDuration, animationEasing, animationSequence } = this.props

    const avatarList = this.getAvatarList()
    const componentClassName = classNames(
      'is-withLayerStack',
      'c-AvatarStack__item'
    )

    const avatarMarkup = avatarList.map((avatar, index) => {
      const key = getComponentKey(avatar, index)

      const avatarProps = this.getAvatarPropsFromIndex(index)
      const avatarStyles = this.getAvatarStyleFromIndex(index)

      return (
        <ItemUI className={componentClassName} key={key} style={avatarStyles}>
          <Animate
            duration={animationDuration}
            easing={animationEasing}
            sequence={animationSequence}
          >
            <AvatarListContext.Provider value={avatarProps}>
              {avatar}
            </AvatarListContext.Provider>
          </Animate>
        </ItemUI>
      )
    })

    return avatarMarkup
  }

  render() {
    const {
      animationEasing,
      animationSequence,
      avatarsClassName,
      borderColor,
      children,
      className,
      max,
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-AvatarStack',
      'is-withLayerStack',
      className
    )

    return (
      <AvatarStackLayeringUI
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {this.renderAvatars()}
      </AvatarStackLayeringUI>
    )
  }
}

AvatarStack.defaultProps = {
  animationDuration: 300,
  animationEasing: 'ease',
  animationSequence: 'fade',
  borderColor: 'white',
  'data-cy': 'AvatarStack',
  max: 5,
  shape: 'circle',
  showStatusBorderColor: true,
}

AvatarStack.propTypes = {
  /** Duration of animation applied to the child Avatars. */
  animationDuration: PropTypes.number,
  /** Easing of animation applied to the child Avatars. */
  animationEasing: PropTypes.string,
  /** Style of animation applied to the child Avatars. */
  animationSequence: PropTypes.string,
  /** Custom className to pass to Avatars. */
  avatarsClassName: PropTypes.string,
  /** Color for the Avatar border. */
  borderColor: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Number of avatars to display before truncating. */
  max: PropTypes.number,
  /** Color for the Avatar's outer border. */
  outerBorderColor: PropTypes.string,
  /** Shape of the avatars. */
  shape: PropTypes.oneOf(['square', 'rounded', 'circle']),
  /** Renders the StatusDot border. */
  showStatusBorderColor: PropTypes.bool,
  /** Size of the avatars. */
  size: PropTypes.oneOf(['lg', 'md', 'smmd', 'sm', 'xs', 'xxs', '']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default AvatarStack
