import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { BlockUI } from './Skeleton.Block.css'

class Block extends React.PureComponent<any> {
  static displayName = 'Skeleton.Block'

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

export default Block
