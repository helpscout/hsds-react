import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { isPlainContent } from './Popover.utils'
import { ArrowPopoverUI, HeaderUI, HeadingUI, PopoverUI } from './Popover.css'
import Text from '../Text'
import Tooltip from '../Tooltip'
import { TooltipAnimationUI } from '../Tooltip/Tooltip.css'

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

export const Popover = props => {
  const {
    arrowSize,
    innerRef,
    header,
    renderHeader,
    content,
    renderContent,
    className,
    placement,
    triggerOn,
    ...rest
  } = props

  const render = ({ scope, ...tooltipProps }) => {
    const toolTipComponent = (
      <TooltipAnimationUI>
        <PopoverUI {...tooltipProps} data-cy="PopoverContent">
          <PopoverHeader header={header} renderHeader={renderHeader} />
          <PopoverContent content={content} renderContent={renderContent} />
          <ArrowPopoverUI size={arrowSize} data-popper-arrow />
        </PopoverUI>
      </TooltipAnimationUI>
    )

    return <div className={scope}>{toolTipComponent}</div>
  }

  return (
    <Tooltip
      {...getValidProps(rest)}
      className={getClassName(className)}
      innerRef={innerRef}
      render={render}
      trigger={triggerOn}
      placement={placement}
    />
  )
}

Popover.defaultProps = {
  'data-cy': 'Popover',
  innerRef: noop,
  triggerOn: 'click',
}

Popover.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Body content to render within the component. */
  content: PropTypes.any,
  /** Title content to render within the component. */
  header: PropTypes.any,
  /** Where to place the Tooltip. */
  placement: PropTypes.string,
  /** Renders a component within the Popover. Is prioritized over `content` */
  renderContent: PropTypes.any,
  /** Renders a component within the Popover. Is prioritized over `header` */
  renderHeader: PropTypes.any,
  /** Determines how to engage the component. */
  triggerOn: PropTypes.string,
  innerRef: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Popover
