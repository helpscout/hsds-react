import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FluffyCardContainerUI } from './FluffyCard.css'

class Container extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }

  static displayName = 'FluffyCardContainer'

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

export default Container
