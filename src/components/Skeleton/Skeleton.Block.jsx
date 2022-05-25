import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { BlockUI } from './Skeleton.Block.css'

class SkeletonBlock extends React.PureComponent {
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

SkeletonBlock.defaultProps = {
  'data-cy': 'SkeletonBlock',
  withAnimations: true,
}

SkeletonBlock.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}
export default SkeletonBlock
