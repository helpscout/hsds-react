import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { RatingFaceUI } from './RatingFace.css'
import { COMPONENT_KEY } from './RatingFace.utils'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export class RatingFace extends React.PureComponent<Props> {
  static className = 'c-RatingFace'
  static defaultProps = {
    innerRef: noop,
  }

  getClassName() {
    const { className } = this.props
    return classNames(RatingFace.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <RatingFaceUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        {children}
      </RatingFaceUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(RatingFace)

export default PropConnectedComponent
