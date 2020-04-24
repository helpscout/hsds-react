import React, { createContext, useContext, useState } from 'react'
import Tippy from '@tippyjs/react/headless'

import { TooltipUI, ArrowUI } from './Tooltip.css'

import { GlobalContext } from '../HSDS/Provider'

export const TooltipContext = createContext({})

const Tooltip = props => {
  const {
    animationDelay,
    animationDuration,
    arrowSize,
    children,
    closeOnContentClick,
    isOpen,
    minWidth,
    maxWidth,
    placement,
    renderContentProp,
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

  const renderContent = renderContentProp
    ? renderContentProp
    : attrs => {
        const toolTipComponent = (
          <TooltipUI
            className="box"
            tabIndex="-1"
            arrowSize={arrowSize}
            animationDuration={animationDuration}
            data-entered={isEntered}
            minWidth={minWidth}
            maxWidth={maxWidth}
            {...attrs}
          >
            <span dangerouslySetInnerHTML={{ __html: title }} />
            <ArrowUI size={arrowSize} data-popper-arrow />
          </TooltipUI>
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
    render: renderContent,
    trigger,
    showOnCreate: isOpen,
    ...rest,
    ...extraProps,
  }

  return <Tippy {...tippyProps}>{children}</Tippy>
}

Tooltip.defaultProps = {
  animationDelay: 0,
  animationDuration: 200,
  arrowSize: 12,
  isOpen: false,
  placement: 'top',
  triggerOn: 'mouseenter focus',
}

export default Tooltip
