import { useEffect, useContext, useMemo } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { FrameContext } from 'react-frame-component'
import isString from 'lodash.isstring'
import Container, { ID as portalContainerId } from './Portal.Container'
import { isNodeElement } from '@hsds/utils-dom'
import isPlainObject from 'lodash.isplainobject'
import { GlobalContext } from '../HSDS/Provider'

const getMountSelector = (renderTo, body) => {
  let mountSelector
  // 1. Prioritize renderTo selector
  if (renderTo) {
    mountSelector = isString(renderTo)
      ? document.querySelector(renderTo)
      : false
    mountSelector =
      isPlainObject(renderTo) && isNodeElement(renderTo)
        ? renderTo
        : mountSelector
  }

  // 2- is inside an iframe, but not the one created by storybook/cypress
  if (
    !mountSelector &&
    !body &&
    window.parent &&
    !window.STORYBOOK_ENV &&
    !window.Cypress
  ) {
    mountSelector = window.parent.document.body
  }

  // 3. Fallback to <Portal.Container />
  mountSelector = mountSelector || document.getElementById(portalContainerId)

  // 4. Fallback to document.body
  const doc = body || window.document

  return mountSelector || doc.body // fallback
}

const Portal = ({
  children,
  renderTo,
  timeout,
  onClose,
  onOpen,
  className,
  id,
}) => {
  const { getCurrentScope } = useContext(GlobalContext) || {}
  const scope = getCurrentScope ? getCurrentScope() : null

  const frameContext = useContext(FrameContext)
  const body = frameContext ? frameContext.document : null

  const el = useMemo(() => {
    const div = document.createElement('div')
    if (scope) div.classList.add(scope)
    if (className) div.classList.add(...className.split(' '))
    if (id) div.id = id

    return div
  }, [scope, id, className])

  const mount = useMemo(() => getMountSelector(renderTo, body), [
    renderTo,
    body,
  ])

  useEffect(() => {
    mount.appendChild(el)
    if (onOpen) onOpen()

    return () => {
      const unmount = () => {
        if (onClose) onClose()
        if (mount.contains(el)) mount.removeChild(el)
      }

      if (timeout === 0) {
        unmount()
      } else {
        setTimeout(unmount, timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return createPortal(children, el)
}

Portal.Container = Container

Portal.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** The ID for the component. */
  id: PropTypes.string,
  /** A CSS selector to render content, instead of the `<body>`. */
  renderTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Fires as soon as the component has rendered. */
  onOpen: PropTypes.func,
  /** Fires after the component is unmounted. */
  onClose: PropTypes.func,
  /** Delay before the Portal'ed component is unmounted from the DOM. Default is `0`. */
  timeout: PropTypes.number,
}

export default Portal
