import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { FluffyCardContainerUI } from './FluffyCard.css'

class FluffyCardContainer extends React.PureComponent {
  render() {
    const { children, className, ...rest } = this.props
    const componentClassName = classNames('c-FluffyCardContainer', className)

    return (
      <FluffyCardContainerUI
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </FluffyCardContainerUI>
    )
  }
}

FluffyCardContainer.defaultProps = {
  'data-cy': 'FluffyCardContainer',
}

FluffyCardContainer.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default FluffyCardContainer
