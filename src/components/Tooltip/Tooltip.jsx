import React, { createContext, useContext, useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import { isFunction } from '../../utilities/is'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import {
  ArrowUI,
  TooltipAnimationUI,
  TooltipTriggerUI,
  TooltipUI,
} from './Tooltip.css'

import { GlobalContext } from '../HSDS/Provider'

export const TooltipContext = createContext({})

const getClassName = className => classNames('c-Tooltip', className)

const Tooltip = props => {
  const {
    animationDelay,
    animationDuration,
    arrowSize,
    children,
    className,
    closeOnContentClick,
    display,
    isOpen,
    minWidth,
    maxWidth,
    placement,
    render: renderProp,
    renderContent,
    title,
    triggerOn,
    zIndex: zIndexProp,
    ...rest
  } = props
  const { getCurrentScope } = useContext(GlobalContext) || {}
  const { zIndex = zIndexProp } = useContext(TooltipContext) || {}
  const [isEntered, setEntered] = useState(animationDuration === 0)

  const scope = getCurrentScope ? getCurrentScope() : null
  const trigger = triggerOn === 'hover' ? 'mouseenter' : triggerOn

  const hasRenderContent = renderContent && isFunction(renderContent)
  const hasRender = renderProp && isFunction(renderProp)
  const shouldRenderTooltip = title || hasRenderContent || hasRender

  const tooltipProps = {
    className: getClassName(className),
    arrowSize,
    animationDuration,
    'data-entered': isEntered,
    scope: scope,
    minWidth,
    maxWidth,
    tabIndex: '-1',
  }

  const renderTooltip = ({ scope, ...props }) => {
    const toolTipComponent = (
      <TooltipAnimationUI>
        <TooltipUI {...props}>
          {renderContent ? (
            renderContent()
          ) : (
            <span dangerouslySetInnerHTML={{ __html: title }} />
          )}
          <ArrowUI size={arrowSize} data-popper-arrow />
        </TooltipUI>
      </TooltipAnimationUI>
    )

    return <div className={scope}>{toolTipComponent}</div>
  }

  const render = attrs => {
    const props = { ...tooltipProps, ...attrs }
    if (renderProp) return renderProp(props)
    return renderTooltip(props)
  }

  const onShow = () => {
    setTimeout(() => setEntered(true), animationDelay)
  }

  const onHide = () => {
    setEntered(false)
  }

  const extraProps = {}
  if (zIndex) {
    extraProps.zIndex = zIndex
  }

  if (closeOnContentClick) {
    extraProps.interactive = true
    extraProps.interactiveBorder = 20
  }

  const tippyProps = {
    onHide,
    onShow,
    placement,
    render,
    trigger,
    showOnCreate: isOpen,
    ...rest,
    ...extraProps,
  }

  if (!shouldRenderTooltip) {
    return children ? (
      <span {...getValidProps(rest)} className={getClassName(className)}>
        {children}
      </span>
    ) : null
  }

  return (
    <Tippy {...tippyProps}>
      <TooltipTriggerUI tabIndex="0" display={display}>
        {children}
      </TooltipTriggerUI>
    </Tippy>
  )
}

Tooltip.defaultProps = {
  animationDelay: 0,
  animationDuration: 200,
  arrowSize: 12,
  display: null,
  isOpen: false,
  placement: 'top',
  triggerOn: 'mouseenter focus',
}

Tooltip.propTypes = {}

export default Tooltip
