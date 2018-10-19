import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { BlockUI } from './styles/Block.css.js'

class Block extends Component {
  static defaultProps = {
    withAnimations: true,
  }

  render() {
    const { className, children, withAnimations, ...rest } = this.props

    const componentClassName = classNames(
      'c-SkeletonBlock',
      withAnimations && 'is-withAnimations',
      className
    )

    return (
      <BlockUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="presentation"
      />
    )
  }
}

namespaceComponent(COMPONENT_KEY.Block)(Block)

export default Block
