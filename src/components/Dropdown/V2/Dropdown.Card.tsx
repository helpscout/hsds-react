import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../../PropProvider/propConnect'
import EventListener from '../../EventListener'
import { connect } from '@helpscout/wedux'
import { CardUI } from './Dropdown.css'
import { classNames } from '../../../utilities/classNames'
import { namespaceComponent } from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { isDefined, isNumber } from '../../../utilities/is'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  minWidth?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  width?: WidthValue
  triggerNode?: HTMLElement
  style: Object
}

export interface State {
  width?: WidthValue
}

type WidthValue = number | string | null | undefined

export class Card extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    style: {},
  }

  state = {
    width: this.props.width,
  }

  componentDidMount() {
    this.updateWidth()
  }

  updateWidth = () => {
    this.setState({
      width: this.getWidthValue(),
    })
  }

  /* istanbul ignore next */
  getWidthValue(): WidthValue {
    const { triggerNode, width } = this.props
    if (!isDefined(width)) return null
    if (isNumber(width)) return width

    // @ts-ignore
    if (!width.includes('%') || !triggerNode) return width

    return triggerNode.clientWidth * (parseInt(width as string, 10) / 100)
  }

  getStyles(): Object {
    const { minWidth, minHeight, maxHeight, maxWidth, style } = this.props

    return {
      ...style,
      minWidth,
      minHeight,
      maxHeight,
      maxWidth,
      width: this.state.width,
    }
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
        <EventListener event="resize" handler={this.updateWidth} />
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
    const {
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      triggerNode,
      width,
    } = state

    return {
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      triggerNode,
      width,
    }
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedCard
