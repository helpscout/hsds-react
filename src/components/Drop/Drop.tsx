import * as React from 'react'
import PortalWrapper from '../PortalWrapper'
import Positioner from './Drop.Positioner'
import { classNames } from '../../utilities/classNames'

export interface DropProps {
  trigger: Object | Element
  direction: string
  wrapperClassName: string
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
      // TODO: fix typescript complains
      const {
        // @ts-ignore
        className,
        // @ts-ignore
        closePortal,
        direction,
        // @ts-ignore
        exact,
        // @ts-ignore
        isOpen,
        // @ts-ignore
        onBeforeClose,
        // @ts-ignore
        onBeforeOpen,
        // @ts-ignore
        onClose,
        // @ts-ignore
        onOpen,
        // @ts-ignore
        openPortal,
        // @ts-ignore
        path,
        // @ts-ignore
        portalIsOpen,
        // @ts-ignore
        portalIsMounted,
        // @ts-ignore
        style,
        // @ts-ignore
        timeout,
        trigger,
        wrapperClassName,
        // @ts-ignore
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
