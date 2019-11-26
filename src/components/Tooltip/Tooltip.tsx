import * as React from 'react'
import { PopProps } from '../Pop/Pop.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Pop from '../Pop'
import Popper from './Tooltip.Popper'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { isFunction } from '../../utilities/is'
import { renderChildrenSafely } from '../../utilities/component'
import { COMPONENT_KEY } from './Tooltip.utils'
import { getColor } from '../../styles/utilities/color'

export interface Props extends PopProps {
  arrowClassName: string
  contentClassName?: string
  className?: string
  color: string
  dataCyPopper: string
  innerRef: (node: HTMLElement) => void
  minWidth?: number | string
  maxWidth?: number | string
  renderContent?: (props: any) => void
  theme?: string
  title?: any
  zIndex?: number
}

export class Tooltip extends React.PureComponent<Props> {
  static defaultProps = {
    arrowClassName: 'c-TooltipArrow',
    arrowSize: 12,
    animationDelay: 100,
    animationDuration: 100,
    animationSequence: 'fade up',
    color: getColor('charcoal.700'),
    closeOnContentClick: false,
    closeOnMouseLeave: true,
    dataCyPopper: 'TooltipContent',
    innerRef: noop,
    isOpen: false,
    modifiers: {},
    placement: 'top',
    triggerOn: 'hover',
    zIndex: 999,
  }

  static className = 'c-Tooltip'
  static arrowClassName = 'c-TooltipArrow'
  static contentClassName = 'c-TooltipPopper'
  static Popper = Popper

  getClassName() {
    const { className } = this.props

    return classNames(Tooltip.className, className)
  }

  getArrowClassName() {
    const { arrowClassName } = this.props

    return classNames(Tooltip.arrowClassName, arrowClassName)
  }

  getContentClassName() {
    const { contentClassName } = this.props

    return classNames(Tooltip.contentClassName, contentClassName)
  }

  hasRenderContentProp = () => {
    const { renderContent } = this.props

    return renderContent && isFunction(renderContent)
  }

  shouldRenderPopper = () => {
    return this.props.title || this.hasRenderContentProp()
  }

  /**
   * Pop, which uses Popper.js, uses document.createRange. Enzyme/JSDOM
   * doesn't like it when this function fires from a (grand)parent component.
   * The rendering of both content types have been manually tested in
   * Storybook.
   */
  /* istanbul ignore next */
  renderContent = (renderProps?: any) => {
    const { renderContent, placement, title } = this.props

    if (!this.hasRenderContentProp()) return renderChildrenSafely(title)

    // @ts-ignore
    return renderContent({ ...renderProps, placement, title })
  }

  renderPopper = (renderProps?: any) => {
    const { dataCyPopper, maxWidth, minWidth } = this.props

    return (
      <Popper
        className={this.getContentClassName()}
        data-cy={dataCyPopper}
        style={{ maxWidth, minWidth }}
      >
        {this.renderContent(renderProps || /* istanbul ignore next */ {})}
      </Popper>
    )
  }

  render() {
    const { className, children, color, ...rest } = this.props

    if (!this.shouldRenderPopper()) {
      return children ? (
        <span {...getValidProps(rest)} className={this.getClassName()}>
          {children}
        </span>
      ) : null
    }

    return (
      <Pop {...rest} className={this.getClassName()}>
        <Pop.Reference
          className="c-Tooltip__reference"
          data-cy={`${this.props['data-cy']}Reference`}
        >
          {children}
        </Pop.Reference>
        <Pop.Popper
          arrowClassName={this.getArrowClassName()}
          arrowColor={color}
          className={this.getClassName()}
        >
          {this.renderPopper}
        </Pop.Popper>
      </Pop>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Tooltip)

export default PropConnectedComponent
