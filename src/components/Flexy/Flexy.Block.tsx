import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Flexy.utils'
import { BlockUI } from './styles/Flexy.Block.css'

export interface Props {
  children?: any
  className?: string
}

class Block extends React.PureComponent<Props> {
  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-Flexy__block', className)

    return (
      <BlockUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </BlockUI>
    )
  }
}

export default Block
