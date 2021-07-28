/* istanbul ignore file */
/**
 ***DEPRECATED COMPONENT***
 ***DEPRECATED COMPONENT***
 ***DEPRECATED COMPONENT***

  Use Pop instead
 */
import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PortalWrapper from '../PortalWrapper'
import DropPositioner from './Drop.Positioner'
import classNames from 'classnames'

const popoverWrapperBaseZIndex = 1020
const defaultOptions = {
  autoPosition: true,
  id: 'Drop',
  offset: 4,
  timeout: 0,
  zIndex: popoverWrapperBaseZIndex,
}

export const DropComponent = (
  options = defaultOptions
) => ComposedComponent => {
  const portalOptions = Object.assign({}, defaultOptions, options)

  class Drop extends React.PureComponent {
    static propTypes = {
      /** Data attr for Cypress tests. */
      'data-cy': PropTypes.string,
      trigger: PropTypes.any,
      direction: PropTypes.string,
      wrapperClassName: PropTypes.string,
      className: PropTypes.any,
      closePortal: PropTypes.any,
      exact: PropTypes.any,
      isOpen: PropTypes.any,
      onBeforeClose: PropTypes.any,
      onBeforeOpen: PropTypes.any,
      onClose: PropTypes.any,
      onOpen: PropTypes.any,
      openPortal: PropTypes.any,
      path: PropTypes.any,
      portalIsOpen: PropTypes.any,
      portalIsMounted: PropTypes.any,
      style: PropTypes.any,
      timeout: PropTypes.any,
      zIndex: PropTypes.any,
    }

    static defaultProps = {
      'data-cy': 'Drop',
      direction: 'down',
      wrapperClassName: 'c-DropWrapper',
    }

    render() {
      const {
        className,
        closePortal,
        direction,
        exact,
        isOpen,
        onBeforeClose,
        onBeforeOpen,
        onClose,
        onOpen,
        openPortal,
        path,
        portalIsOpen,
        portalIsMounted,
        style,
        timeout,
        trigger,
        wrapperClassName,
        zIndex: propsZindex,
        ...rest
      } = this.props
      const { autoPosition, offset, zIndex } = portalOptions
      const componentClassName = classNames('c-Drop')

      return (
        <div className={componentClassName}>
          <DropPositioner
            autoPosition={autoPosition}
            direction={direction}
            offset={offset}
            trigger={trigger}
            zIndex={zIndex}
          >
            <ComposedComponent
              className={className}
              closePortal={closePortal}
              isOpen={portalIsOpen}
              onClose={onClose}
              onOpen={onOpen}
              style={style}
              {...getValidProps(rest)}
            />
          </DropPositioner>
        </div>
      )
    }
  }

  const componentName =
    ComposedComponent.displayName || ComposedComponent.name || 'Component'

  Drop.displayName = `withDrop(${componentName})`

  return Drop
}

const Drop = (options = defaultOptions) => ComposedComponent => {
  return PortalWrapper(options)(DropComponent(options)(ComposedComponent))
}

Drop.Positioner = DropPositioner

export default Drop
