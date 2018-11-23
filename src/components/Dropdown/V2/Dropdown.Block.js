import * as React from 'react'
import { BlockUI } from './Dropdown.css'
import { classNames } from '../../../utilities/classNames'

class Block extends React.PureComponent {
  static defaultProps = {
    isSeamless: false,
    isStretchy: false,
  }

  render() {
    const { children, isSeamless, isStretchy } = this.props
    const componentClassName = classNames(
      'c-DropdownV2Block',
      isSeamless && 'is-seamless',
      isStretchy && 'is-stretchy'
    )

    return <BlockUI className={componentClassName}>{children}</BlockUI>
  }
}

export default Block
