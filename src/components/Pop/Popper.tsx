import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ReactPopper from '../Popper/Popper'
import Animate from '../Animate'
import Portal from './Pop.Portal'
import Arrow from './Arrow'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { renderRenderPropComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { PopProps } from './Pop.types'
import { PopPopperUI } from './Pop.css'

const uniqueID = createUniqueIDFactory('PopPopper')

export interface Props extends PopProps {
  animationDelay: number | string
  animationDuration: number | string
  animationEasing: string
  animationSequence: string | Array<string>
  arrowColor?: string
  arrowSize: number
  offset: number
  close: () => void
  onClick: (event: React.MouseEvent) => void
  onContentClick: (event: React.MouseEvent) => void
  onMouseLeave: (event: React.MouseEvent) => void
  positionFixed: boolean
  zIndex: number
}

export class Popper extends React.Component<Props> {
  static defaultProps = {
    animationDelay: 0,
    animationDuration: 0,
    animationEasing: 'ease',
    animationSequence: 'fade',
    arrowSize: 5,
    close: noop,
    closeOnBodyClick: true,
    closeOnContentClick: false,
    closeOnEscPress: true,
    closeOnMouseLeave: true,
    display: 'inline-block',
    isOpen: false,
    modifiers: {},
    offset: 0,
    onClick: noop,
    onClose: noop,
    onContentClick: noop,
    onMouseLeave: noop,
    onOpen: noop,
    placement: 'auto',
    positionFixed: false,
    showArrow: true,
    triggerOn: 'click',
    zIndex: 1000,
  }

  id = uniqueID()

  getId() {
    return this.props.id || this.id
  }

  handleOnClick = (event: React.MouseEvent) => {
    /* istanbul ignore next */
    event && event.stopPropagation()
    this.props.onClick(event)
    this.props.onContentClick(event)
  }

  renderChildren = () => {
    const { children, close } = this.props
    return renderRenderPropComponent(children, { close })
  }

  render() {
    const {
      animationDelay,
      animationDuration,
      animationEasing,
      animationSequence,
      arrowClassName,
      arrowColor,
      arrowSize,
      children,
      className,
      close,
      isOpen,
      offset,
      onClick,
      onMouseLeave,
      modifiers,
      positionFixed,
      placement,
      showArrow,
      zIndex,
      ...rest
    } = this.props

    const componentClassName = classNames('c-PopPopper', className)

    const animateProps = {
      delay: animationDelay,
      duration: animationDuration,
      easing: animationEasing,
      sequence: animationSequence,
      timeout: 0,
    }

    return (
      <ReactPopper
        data-cy="PopPopper"
        modifiers={modifiers}
        placement={placement}
        positionFixed={positionFixed}
      >
        {({ ref, style, placement, arrowProps }) => {
          return (
            <Portal
              className="PopPortal"
              id={this.getId()}
              isOpen={isOpen}
              onClose={close}
            >
              <PopPopperUI
                {...getValidProps(rest)}
                className={componentClassName}
                data-placement={placement}
                onClick={this.handleOnClick}
                ref={ref}
                role="tooltip"
                style={{
                  ...enhancePopperStyles({
                    arrowSize,
                    offset,
                    placement,
                    style,
                  }),
                  zIndex,
                }}
              >
                <Animate {...animateProps}>
                  <div
                    className="c-PopPopperContentWrapper"
                    onMouseLeave={onMouseLeave}
                    style={{ position: 'relative', zIndex }}
                  >
                    {this.renderChildren()}
                    <Arrow
                      color={arrowColor}
                      className={arrowClassName}
                      placement={placement}
                      showArrow={showArrow}
                      arrowRef={arrowProps.ref}
                      style={arrowProps.style}
                      size={arrowSize}
                      zIndex={zIndex - 1}
                    />
                  </div>
                </Animate>
              </PopPopperUI>
            </Portal>
          )
        }}
      </ReactPopper>
    )
  }
}

/**
 * Adjust styles for the Popper HTML element.
 *
 * @param   {object} props
 * @returns {object}
 */
export const enhancePopperStyles = (props: any = {}) => {
  const options = {
    arrowSize: props.arrowSize || 5,
    offset: props.offset || 0,
    placement: props.placement || 'top',
    style: props.style || {},
  }

  const { arrowSize, offset, placement, style } = options

  if (placement.indexOf('top') >= 0) {
    return {
      ...style,
      top: `${(arrowSize + offset) * -1}px`,
    }
  }
  if (placement.indexOf('bottom') >= 0) {
    return {
      ...style,
      top: `${(arrowSize + offset) * 1}px`,
    }
  }
  if (placement.indexOf('left') >= 0) {
    return {
      ...style,
      left: `${(arrowSize / 2) * -1}px`,
    }
  }
  if (placement.indexOf('right') >= 0) {
    return {
      ...style,
      left: `${(arrowSize / 2) * 1}px`,
    }
  }

  return style
}

export default Popper
