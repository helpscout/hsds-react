import React from 'react'
import PropTypes from 'prop-types'
import PortalWrapper from '../PortalWrapper'
import Positioner from './Drop.Positioner'
import { classNames } from '../../utilities/classNames'

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
          <Positioner
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
              {...rest}
            />
          </Positioner>
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

Drop.Positioner = Positioner

export default Drop
