import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { BlockUI } from './Skeleton.Block.css'

class SkeletonBlock extends React.PureComponent {
  static displayName = 'Skeleton.Block'

  static defaultProps = {
    withAnimations: true,
  }

  render() {
    const { className, children, withAnimations, ...rest } = this.props

    const componentClassName = classNames(
      'c-SkeletonBlock',
      withAnimations && 'is-withAnimations',
      className
    )

    return (
      <BlockUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="presentation"
      />
    )
  }
}

SkeletonBlock.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonBlock
