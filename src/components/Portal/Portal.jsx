import React, { useEffect, useContext, useMemo } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { FrameContext } from 'react-frame-component'

import getDocumentFromComponent from '@helpscout/react-utils/dist/getDocumentFromComponent'

import Container, { ID as portalContainerId } from './Portal.Container'
import { isNodeElement } from '../../utilities/node'
import { isObject, isString } from '../../utilities/is'
import { GlobalContext } from '../HSDS/Provider'

const getMountSelector = (renderTo = null) => {
  let mountSelector
  // 1. Prioritize renderTo selector
  if (renderTo) {
    mountSelector = isString(renderTo)
      ? document.querySelector(renderTo)
      : false
    mountSelector =
      isObject(renderTo) && isNodeElement(renderTo) ? renderTo : mountSelector
  }

  // 2- is inside an iframe, but not the one created by storybook/cypress
  if (
    !mountSelector &&
    window.parent &&
    !window.STORYBOOK_ENV &&
    !window.Cypress
  ) {
    mountSelector = window.parent.document.body
  }

  // 3. Fallback to <Portal.Container />
  mountSelector =
    mountSelector || document.querySelector(`#${portalContainerId}`)

  // 4. Fallback to document.body
  const doc = getDocumentFromComponent(this) || window.document

  return mountSelector || doc.body // fallback
}

const Portal = ({ children, renderTo, timeout }) => {
  const { getCurrentScope } = useContext(GlobalContext) || {}
  const scope = getCurrentScope ? getCurrentScope() : null

  const frameContext = useContext(FrameContext)
  const body = frameContext ? frameContext.document.body : null

  const el = useMemo(() => {
    const div = document.createElement('div')
    if (scope) div.classList.add(scope)
    return div
  }, [scope])

  const mount = useMemo(() => getMountSelector(renderTo || body), [
    renderTo,
    body,
  ])

  useEffect(() => {
    mount.appendChild(el)
    return () => {
      setTimeout(() => {
        mount.removeChild(el)
      }, timeout)
    }
  }, [])

  return createPortal(children, el)
}

Portal.Container = Container

Portal.propTypes = {
  className: PropTypes.string,
  exact: PropTypes.bool,
  id: PropTypes.string,
  renderTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onBeforeOpen: PropTypes.func,
  onOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onClose: PropTypes.func,
  path: PropTypes.string,
  timeout: PropTypes.number,
}

export default Portal
