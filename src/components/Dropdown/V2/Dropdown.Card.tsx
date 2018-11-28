import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../../PropProvider/propConnect'
import { connect } from 'unistore/react'
import { CardUI } from './Dropdown.css'
import { classNames } from '../../../utilities/classNames'
import { namespaceComponent } from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  minWidth?: number
  minHeight?: number
  maxHeight?: number
  maxWidth?: number
  style: Object
}

export class Card extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    style: {},
  }

  getStyles = (): Object => {
    const { minWidth, minHeight, maxHeight, maxWidth, style } = this.props

    return { ...style, minWidth, minHeight, maxHeight, maxWidth }
  }

  render() {
    const { className, children, innerRef, ...rest } = this.props

    const componentClassName = classNames('c-DropdownV2Card', className)

    return (
      <CardUI
        {...getValidProps(rest)}
        className={componentClassName}
        innerRef={innerRef}
        style={this.getStyles()}
      >
        {children}
      </CardUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Card)(Card)
const PropConnectedComponent = propConnect(COMPONENT_KEY.Card)(Card)

const ConnectedCard: any = connect(
  // mapStateToProps
  (state: any) => {
    const { maxHeight, maxWidth, minHeight, minWidth } = state

    return {
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
    }
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedCard
