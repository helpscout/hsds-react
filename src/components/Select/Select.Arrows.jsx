import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { SelectArrowsUI } from './Select.css'

export class SelectArrows extends React.PureComponent {
  static defaultProps = {
    state: 'default',
  }

  render() {
    const { className, state, ...rest } = this.props
    const componentClassName = classNames(
      'c-SelectArrows',
      state && `is-${state}`,
      className
    )

    return (
      <SelectArrowsUI
        role="presentation"
        {...getValidProps(rest)}
        className={componentClassName}
      />
    )
  }
}

export default SelectArrows
