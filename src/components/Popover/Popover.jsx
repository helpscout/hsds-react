import React from 'react'
import PropTypes from 'prop-types'

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
    ...rest
  } = props

  const render = ({ scope, ...tooltipProps }) => {
    const toolTipComponent = (
      <TooltipAnimationUI>
        <PopoverUI {...tooltipProps}>
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
      {...rest}
      className={getClassName(className)}
      closeOnMouseLeave={false}
      data-cy="Popover"
      innerRef={innerRef}
      render={render}
      trigger="click"
    />
  )
}

Popover.defaultProps = Object.assign(Tooltip.defaultProps, {
  innerRef: noop,
})

Popover.propTypes = Object.assign(Tooltip.propTypes, {
  className: PropTypes.string,
  content: PropTypes.any,
  children: PropTypes.any,
  innerRef: PropTypes.func,
  header: PropTypes.any,
  renderHeader: PropTypes.any,
  renderContent: PropTypes.any,
})

export default Popover
