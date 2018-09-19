// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { BlockUI } from './styles/Block.css.js'

type Props = {
  children?: any,
  className?: string,
}

class Block extends Component<Props> {
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

namespaceComponent(COMPONENT_KEY)(Block)

export default Block
