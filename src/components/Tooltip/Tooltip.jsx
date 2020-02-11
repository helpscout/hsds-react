import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Pop from '../Pop'
import Popper from './Tooltip.Popper'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { isFunction } from '../../utilities/is'
import { renderChildrenSafely } from '../../utilities/component'
import { getColor } from '../../styles/utilities/color'
import { popProps } from '../Pop/Pop'

export const TooltipContext = React.createContext({})

export class Tooltip extends React.PureComponent {
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
    zIndex: 9999,
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
  renderContent = renderProps => {
    const { renderContent, placement, title } = this.props

    if (!this.hasRenderContentProp()) return renderChildrenSafely(title)

    return renderContent({ ...renderProps, placement, title })
  }

  renderPopper = renderProps => {
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
    const dataCy = this.props['data-cy'] || 'Tooltip'

    if (!this.shouldRenderPopper()) {
      return children ? (
        <span {...getValidProps(rest)} className={this.getClassName()}>
          {children}
        </span>
      ) : null
    }

    return (
      <Pop {...rest} className={this.getClassName()} data-cy={dataCy}>
        <Pop.Reference
          className="c-Tooltip__reference"
          data-cy="ToolTipReference"
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

const TooltipConsumer = props => {
  const contextValue = React.useContext(TooltipContext)

  if (!contextValue) {
    return <Tooltip {...props} />
  }

  const newProps = { ...props, ...contextValue }

  return <Tooltip {...newProps} />
}

Tooltip.propTypes = Object.assign(popProps, {
  arrowClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  dataCyPopper: PropTypes.string,
  innerRef: PropTypes.func,
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderContent: PropTypes.func,
  theme: PropTypes.string,
  title: PropTypes.any,
  zIndex: PropTypes.number,
})

TooltipConsumer.propTypes = Tooltip.propTypes

export default TooltipConsumer
