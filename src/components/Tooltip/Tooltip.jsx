import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import { isFunction } from '../../utilities/is'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import {
  ArrowUI,
  TooltipAnimationUI,
  TooltipTriggerUI,
  TooltipUI,
} from './Tooltip.css'
import { GlobalContext } from '../HSDS/Provider'
import KeyboardBadge from '../KeyboardBadge'

export const TooltipContext = createContext({})

const getClassName = className => classNames('c-Tooltip', className)

const hideOnEsc = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn({ hide }) {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        hide()
      }
    }

    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown)
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown)
      },
    }
  },
}

const Tooltip = ({
  animationDelay,
  animationDuration,
  arrowSize,
  badge,
  children,
  className,
  closeOnContentClick,
  closeOnEscPress,
  display,
  'data-cy': dataCy,
  getTippyInstance = () => {},
  innerRef,
  isOpen,
  minWidth,
  maxWidth,
  placement,
  render: renderProp,
  renderContent,
  title,
  triggerOn,
  withTriggerWrapper,
  withArrow = true,
  zIndex: zIndexProp,
  ...rest
}) => {
  const { getCurrentScope } = useContext(GlobalContext) || {}
  const { zIndex = zIndexProp, animationDuration: animationDurationContext } =
    useContext(TooltipContext) || {}
  const [isEntered, setEntered] = useState(animationDuration === 0)
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const scope = getCurrentScope ? getCurrentScope() : null

  const hasRenderContent = renderContent && isFunction(renderContent)
  const hasRender = renderProp && isFunction(renderProp)
  const shouldRenderTooltip = title || hasRenderContent || hasRender
  const hasKeyboardBadge = badge && !hasRender

  const duration = animationDurationContext
    ? animationDurationContext
    : animationDuration

  const tooltipProps = {
    className: getClassName(className),
    arrowSize,
    animationDuration: duration,
    'data-entered': isEntered,
    maxWidth,
    minWidth,
    ref: innerRef,
    scope: scope,
    tabIndex: '-1',
  }

  const renderTooltip = ({ scope, className, ...props }) => {
    let titleContent = null

    if (typeof title === 'string') {
      titleContent = <span dangerouslySetInnerHTML={{ __html: title }} />
    } else {
      titleContent = title
    }

    const tooltipClassnames = classNames(
      className,
      hasKeyboardBadge && 'with-badge'
    )

    const toolTipComponent = (
      <TooltipAnimationUI>
        <TooltipUI className={tooltipClassnames} {...props}>
          {renderContent ? renderContent() : titleContent}
          {hasKeyboardBadge ? <KeyboardBadge value={badge} /> : null}
          {withArrow && (
            <ArrowUI
              className="c-Tooltip_ArrowUI"
              arrowSize={arrowSize}
              data-popper-arrow
            />
          )}
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
    setTimeout(() => {
      if (isMounted.current) {
        setEntered(true)
      }
    }, animationDelay)
  }

  const onCreate = instance => {
    getTippyInstance && getTippyInstance(instance)
  }

  const onHide = () => {
    setEntered(false)
  }

  const extraProps = {}
  if (zIndex) {
    extraProps.zIndex = zIndex
  }

  if (!closeOnContentClick) {
    extraProps.interactive = true
    extraProps.interactiveBorder = 20
  }

  const plugins = []
  if (closeOnEscPress) {
    plugins.push(hideOnEsc)
  }

  const defaultTippyProps = {
    onCreate,
    onHide,
    onShow,
    placement,
    plugins,
    render,
  }

  // only set those props if the component is not in a controlled way
  if (!rest.hasOwnProperty('visible')) {
    defaultTippyProps.showOnCreate = isOpen
    defaultTippyProps.trigger = triggerOn === 'hover' ? 'mouseenter' : triggerOn
  }

  const tippyProps = {
    ...defaultTippyProps,
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

  let triggerComponent

  if (
    !withTriggerWrapper &&
    React.isValidElement(children) &&
    React.Children.count(children) === 1
  ) {
    const component = React.Children.only(children)
    const triggerProps = {
      className: classNames('TooltipTrigger', component.props.className),
      'data-cy': component.props['data-cy'] || dataCy,
      tabIndex: component.props['tabIndex'] || 0,
      'aria-expanded': null, // let tippy handle that prop
    }
    triggerComponent = React.cloneElement(component, triggerProps)
  } else {
    triggerComponent = (
      <TooltipTriggerUI
        tabIndex="0"
        display={display}
        data-cy={dataCy}
        className="TooltipTrigger"
      >
        {children}
      </TooltipTriggerUI>
    )
  }

  return <Tippy {...tippyProps}>{triggerComponent}</Tippy>
}

Tooltip.defaultProps = {
  animationDelay: 0,
  animationDuration: 200,
  arrowSize: 12,
  closeOnEscPress: true,
  'data-cy': 'Tooltip',
  display: null,
  isOpen: false,
  placement: 'top',
  triggerOn: 'mouseenter focus',
  withTriggerWrapper: true,
}

Tooltip.propTypes = {
  animationDelay: PropTypes.number,
  animationDuration: PropTypes.number,
  /** Size of the Arrow in pixels */
  arrowSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Render the value within a KeyboardBadge component after the title. Will be render only when using the title prop */
  badge: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Whether to allow closing the tooltip on pressing ESC */
  closeOnEscPress: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Apply custom css rule `display` */
  display: PropTypes.string,
  getTippyInstance: PropTypes.any,
  /** Determine if the tooltip is open via a prop */
  isOpen: PropTypes.bool,
  /** Max width for the component. */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Min width for the component. */
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Renders a component within the Tooltip. Is prioritized over `title` */
  renderContent: PropTypes.func,
  /** Where to place the Tooltip. */
  placement: PropTypes.string,
  /** Text to display within the Tooltip. */
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Determines how to engage the component. */
  triggerOn: PropTypes.string,
  /** Set the tooltip to be controlled externally */
  visible: PropTypes.bool,
  /** Wrap the trigger with a span */
  withTriggerWrapper: PropTypes.bool,
  /** Whether to render the arrow */
  withArrow: PropTypes.bool,
}

export default Tooltip
