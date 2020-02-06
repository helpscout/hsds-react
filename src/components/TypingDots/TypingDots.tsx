import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { TypingDotsProps } from './TypingDots.types'
import { TypingDotsUI, DotUI } from './styles/TypingDots.css'
import { COMPONENT_KEY } from './TypingDots.utils'

export class TypingDots extends React.PureComponent<TypingDotsProps> {
  static className = 'c-TypingDots'

  getClassName() {
    const { className } = this.props
    return classNames(TypingDots.className, className)
  }

  render() {
    const { className, ...rest } = this.props

    return (
      <TypingDotsUI {...getValidProps(rest)} className={this.getClassName()}>
        <DotUI delay="0s" opacity="1" />
        <DotUI delay="-1.1s" opacity=".6" />
        <DotUI delay="-0.9s" opacity=".2" />
      </TypingDotsUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(TypingDots)

export default PropConnectedComponent
