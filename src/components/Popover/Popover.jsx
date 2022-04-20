import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isPlainContent } from './Popover.utils'
import { ArrowPopoverUI, HeaderUI, HeadingUI, PopoverUI } from './Popover.css'
import Text from '../Text'
import Tooltip from '../Tooltip'
import { TooltipAnimationUI } from '../Tooltip/Tooltip.css'
import isFunction from 'lodash.isfunction'

const getClassName = className => classNames('c-Popover', className)

const PopoverContent = ({ content, renderContent }) => {
  if (renderContent) return renderContent()

  if (content) {
    if (isPlainContent(content)) {
      return <Text>{content}</Text>
    } else {
      return content
    }
  }

  return null
}

const PopoverHeader = ({ header, renderHeader }) => {
  if (!header && !renderHeader) return null

  let headerContent

  if (renderHeader) {
    headerContent = renderHeader()
  } else if (header) {
    headerContent = isPlainContent(header) ? (
      <HeadingUI>{header}</HeadingUI>
    ) : (
      header
    )
  }

  if (headerContent) {
    return <HeaderUI>{headerContent}</HeaderUI>
  }

  return null
}

function noop() {}

export const Popover = ({
  arrowSize = 14,
  innerRef = noop,
  header,
  renderHeader,
  content,
  renderContent,
  renderAnimation,
  className,
  placement,
  triggerOn = 'click',
  withArrow = true,
  ...rest
}) => {
  console.log(rest)
  const render = tooltipProps => {
    const toolTipComponent = (
      <PopoverUI {...tooltipProps} data-cy="PopoverContent">
        <PopoverHeader header={header} renderHeader={renderHeader} />
        <PopoverContent content={content} renderContent={renderContent} />
        {withArrow && (
          <ArrowPopoverUI
            className="ArrowPopoverUI"
            arrowSize={arrowSize}
            data-popper-arrow
          />
        )}
      </PopoverUI>
    )

    const tooltipWithAnimation = isFunction(renderAnimation) ? (
      renderAnimation(toolTipComponent)
    ) : (
      <TooltipAnimationUI>{toolTipComponent}</TooltipAnimationUI>
    )

    return <div className="hsds-react hsds-beacon">{tooltipWithAnimation}</div>
  }

  return (
    <Tooltip
      {...rest}
      className={getClassName(className)}
      innerRef={innerRef}
      render={render}
      triggerOn={triggerOn}
      placement={placement}
    />
  )
}

Popover.propTypes = {
  /** Size of the "arrow" or "tip" for the popover */
  arrowSize: PropTypes.number,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Body content to render within the component. */
  content: PropTypes.any,
  innerRef: PropTypes.func,
  /** Title content to render within the component. */
  header: PropTypes.any,
  /** Where to place the Tooltip. */
  placement: PropTypes.string,
  /** Renders a component within the Popover. Is prioritized over `content` */
  renderContent: PropTypes.any,
  /** Renders a component within the Popover. Is prioritized over `header` */
  renderHeader: PropTypes.any,
  /** Renders a wrapper around the tooltip to customize the animation. */
  renderAnimation: PropTypes.func,
  /** Determines how to engage the component. */
  triggerOn: PropTypes.string,
  /** Whether to render the arrow */
  withArrow: PropTypes.bool,
}

export default Popover
