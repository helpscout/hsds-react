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

  const shouldRenderTooltip =
    title || (renderContent && isFunction(renderContent))

  const render = attrs => {
    const toolTipComponent = (
      <TooltipAnimationUI>
        <TooltipUI
          className={getClassName(className)}
          tabIndex="-1"
          arrowSize={arrowSize}
          animationDuration={animationDuration}
          minWidth={minWidth}
          maxWidth={maxWidth}
          data-entered={isEntered}
          {...attrs}
        >
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
