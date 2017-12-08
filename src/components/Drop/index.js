import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import PortalWrapper from '../PortalWrapper'
import Positioner from './Positioner'
import classNames from '../../utilities/classNames'
import { propTypes as portalTypes } from '../Portal'

export const propTypes = Object.assign({}, portalTypes, {
  trigger: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  direction: PropTypes.string,
  wrapperClassName: PropTypes.string
})

const defaultProps = {
  direction: 'down',
  wrapperClassName: 'c-DropWrapper'
}

const popoverWrapperBaseZIndex = 1020

const defaultOptions = {
  autoPosition: true,
  id: 'Drop',
  offset: 4,
  timeout: 0,
  zIndex: popoverWrapperBaseZIndex
}

export const DropComponent = (/* istanbul ignore next */ options = defaultOptions) => ComposedComponent => {
  const portalOptions = Object.assign({}, defaultOptions, options)

  class Drop extends Component {
    render () {
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

      const {
        autoPosition,
        offset,
        zIndex
      } = portalOptions

      const componentClassName = classNames(
        'c-Drop'
      )

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

  Drop.propTypes = propTypes
  Drop.defaultProps = defaultProps

  return Drop
}

const Drop = (options = defaultOptions) => ComposedComponent => {
  return PortalWrapper(options)(DropComponent(options)(ComposedComponent))
}

Drop.Positioner = Positioner

export default Drop
