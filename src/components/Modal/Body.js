import React from 'react'
import PropTypes from 'prop-types'
import Scrollable from '../Scrollable'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  onScroll: PropTypes.func,
  scrollable: PropTypes.bool,
  scrollableRef: PropTypes.func,
  scrollFade: PropTypes.bool
}

const defaultProps = {
  onScroll: noop,
  scrollable: true,
  scrollableRef: noop,
  scrollFade: true
}

const Body = props => {
  const {
    className,
    children,
    onScroll,
    scrollable,
    scrollFade,
    scrollableRef,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ModalBody',
    scrollable ? 'is-scrollable' : 'is-not-scrollable',
    className
  )

  const childrenContent = scrollable ? (
    <Scrollable
      className='c-ModalBody__scrollable'
      fade={scrollFade}
      rounded
      onScroll={onScroll}
      scrollableRef={scrollableRef}
    >
      {children}
    </Scrollable>
  ) : children

  return (
    <div className={componentClassName} {...rest}>
      {childrenContent}
    </div>
  )
}

Body.propTypes = propTypes
Body.defaultProps = defaultProps
Body.displayName = 'ModalBody'

export default Body
