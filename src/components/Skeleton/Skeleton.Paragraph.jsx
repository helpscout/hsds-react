import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from './Skeleton.Text'
import classNames from 'classnames'

class SkeletonParagraph extends React.PureComponent {
  render() {
    const { className, withAnimations, ...rest } = this.props
    const componentClassName = classNames('c-SkeletonParagraph', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        <Text width="90%" withAnimations={withAnimations} />
        <Text width="60%" withAnimations={withAnimations} />
        <Text width="70%" withAnimations={withAnimations} />
        <Text width="20%" withAnimations={withAnimations} />
      </div>
    )
  }
}

SkeletonParagraph.defaultProps = {
  'data-cy': 'SkeletonParagraph',
  withAnimations: true,
}

SkeletonParagraph.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonParagraph
