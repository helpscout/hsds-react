/* istanbul ignore file */
/**
 ***DEPRECATED COMPONENT***
 ***DEPRECATED COMPONENT***
 ***DEPRECATED COMPONENT***
 */
import React from 'react'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { SelectArrowsUI } from './Select.css'

export class SelectArrows extends React.PureComponent {
  render() {
    const { className, state, ...rest } = this.props
    const componentClassName = classNames(
      'c-SelectArrows',
      state && `is-${state}`,
      className
    )

    return (
      <SelectArrowsUI
        {...getValidProps(rest)}
        role="presentation"
        className={componentClassName}
      />
    )
  }
}

SelectArrows.defaultProps = {
  'data-cy': 'SelectArrows',
  state: 'default',
}

export default SelectArrows
