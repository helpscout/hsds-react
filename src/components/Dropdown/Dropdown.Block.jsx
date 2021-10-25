// Deprecated
/* istanbul ignore file */
import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { BlockUI } from './Dropdown.css'
import classNames from 'classnames'
import { noop } from '../../utilities/other'

export class DropdownBlock extends React.PureComponent {
  render() {
    const {
      children,
      className,
      innerRef,
      isSeamless,
      isStretchy,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-DropdownBlock',
      isSeamless && 'is-seamless',
      isStretchy && 'is-stretchy',
      className
    )

    return (
      <BlockUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={innerRef}
      >
        {children}
      </BlockUI>
    )
  }
}

DropdownBlock.defaultProps = {
  'data-cy': 'DropdownBlock',
  innerRef: noop,
  isSeamless: false,
  isStretchy: false,
}

DropdownBlock.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  isSeamless: PropTypes.bool,
  isStretchy: PropTypes.bool,
}

export default DropdownBlock
