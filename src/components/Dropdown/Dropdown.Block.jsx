import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { BlockUI } from './Dropdown.css'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export class Block extends React.PureComponent {
  static displayName = 'DropdownBlock'

  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
    isSeamless: PropTypes.bool,
    isStretchy: PropTypes.bool,
  }

  static defaultProps = {
    innerRef: noop,
    isSeamless: false,
    isStretchy: false,
  }

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

export default Block
