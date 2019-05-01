import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { SelectArrowsUI } from './Select.css'
import { UIState } from '../../constants/types'

export interface Props {
  className?: string
  state?: UIState
}

export class SelectArrows extends React.PureComponent<Props> {
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
