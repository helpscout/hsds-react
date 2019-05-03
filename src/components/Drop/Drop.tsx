import * as React from 'react'
import PortalWrapper from '../PortalWrapper'
import Positioner from './Drop.Positioner'
import { classNames } from '../../utilities/classNames'

export interface DropProps {
  trigger: Object | Element
  direction: string
  wrapperClassName: string
  className?: any
  closePortal?: any
  exact?: any
  isOpen?: any
  onBeforeClose?: any
  onBeforeOpen?: any
  onClose?: any
  onOpen?: any
  openPortal?: any
  path?: any
  portalIsOpen?: any
  portalIsMounted?: any
  style?: any
  timeout?: any
  zIndex?: any
}

const popoverWrapperBaseZIndex = 1020
const defaultOptions = {
  autoPosition: true,
  id: 'Drop',
  offset: 4,
  timeout: 0,
  zIndex: popoverWrapperBaseZIndex,
}

export const DropComponent: any = (
  /* istanbul ignore next */ options = defaultOptions
) => ComposedComponent => {
  const portalOptions = Object.assign({}, defaultOptions, options)

  class Drop extends React.PureComponent<DropProps> {
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
    ComposedComponent.displayName ||
    ComposedComponent.name ||
    /* istanbul ignore next */
    'Component'

  // TODO: fix typescript complains
  // @ts-ignore
  Drop.displayName = `withDrop(${componentName})`

  return Drop
}

const Drop = (options = defaultOptions) => ComposedComponent => {
  // TODO: fix typescript complains
  // @ts-ignore
  return PortalWrapper(options)(DropComponent(options)(ComposedComponent))
}

Drop.Positioner = Positioner

export default Drop
