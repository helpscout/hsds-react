import { Align, Gap, Just } from './Flexy.types'
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Block from './Flexy.Block'
import Item from './Flexy.Item'
import { classNames } from '../../utilities/classNames'

import { FlexyUI } from './styles/Flexy.css'

export interface Props {
  align: Align
  baseSize: number
  children?: any
  className?: string
  gap: Gap
  just: Just
}

class Flexy extends React.PureComponent<Props> {
  static defaultProps = {
    gap: 'sm',
    baseSize: 4,
  }

  static className = 'c-Flexy'

  static Block = Block
  static Item = Item

  render() {
    const {
      align,
      baseSize,
      children,
      className,
      gap,
      just,
      ...rest
    } = this.props

    const componentClassName = classNames(
      Flexy.className,
      align && `is-align-${align} is-${align}`,
      gap && `is-gap-${gap}`,
      just && `is-just-${just}`,
      className
    )
    return (
      // @ts-ignore
      <FlexyUI
        {...getValidProps(rest)}
        baseSize={baseSize}
        className={componentClassName}
      >
        {children}
      </FlexyUI>
    )
  }
}

export default Flexy
