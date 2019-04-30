import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Skeleton.utils'
import { BlockUI } from './styles/Skeleton.Block.css'

class Block extends React.PureComponent {
  static defaultProps = {
    withAnimations: true,
  }

  render() {
    // TODO: fix typescript complains
    // @ts-ignore
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
