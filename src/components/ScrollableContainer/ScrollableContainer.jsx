import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useScrollShadow from '../../hooks/useScrollShadow'
import {
  ContainerScrollUI,
  HeaderUI,
  BodyUI,
  FooterUI,
} from './ScrollableContainer.css'

function ScrollableContainer({
  className,
  'data-cy': dataCy = 'ScrollableContainer',
  drawInitialShadowsDelay = 0,
  header,
  footer,
  body,
  width = '300px',
  height = '500px',
  shadows = {},
}) {
  const headerRef = useRef(null)
  const bodyRef = useRef(null)
  const footerRef = useRef(null)
  const [handleOnScroll] = useScrollShadow({
    bottomRef: footerRef,
    drawInitialShadowsDelay,
    scrollableRef: bodyRef,
    shadows,
    topRef: headerRef,
  })

  return (
    <ContainerScrollUI
      className={classNames('c-ScrollableContainer', className)}
      data-cy={dataCy}
      height={height}
      width={width}
    >
      {header ? (
        <HeaderUI
          className={classNames(
            'ScrollableContainer__Header',
            header.props.className
          )}
          component={React.cloneElement(header, {
            ...header.props,
            ref: headerRef,
          })}
        />
      ) : null}
      {body ? (
        <BodyUI
          className={classNames(
            'ScrollableContainer__Body',
            body.props.className
          )}
          component={React.cloneElement(body, { ...body.props, ref: bodyRef })}
          onScroll={handleOnScroll}
        />
      ) : null}
      {footer ? (
        <FooterUI
          className={classNames(
            'ScrollableContainer__Footer',
            footer.props.className
          )}
          component={React.cloneElement(footer, {
            ...footer.props,
            ref: footerRef,
          })}
        />
      ) : null}
    </ContainerScrollUI>
  )
}

const shadowShape = PropTypes.shape({
  initial: PropTypes.string,
  scrolled: PropTypes.string,
})

ScrollableContainer.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** An element to render as the body (content), this is the one that gets scrolled */
  body: PropTypes.element,
  /** If you're animating a component in, the scrollable element (body) might not have its height determined yet until that animation completes, pass a number in ms equal or larger to the length of the animation to account for this and give React time to get the size. */
  drawInitialShadowsDelay: PropTypes.number,
  /** An element to render fixed at the top of the container */
  header: PropTypes.element,
  /** An element to render fixed at the bottom of the container */
  footer: PropTypes.element,
  /** The container width, can also override with a styled component instead */
  width: PropTypes.string,
  /** The container height, can also override with a styled component instead */
  height: PropTypes.string,
  /** Custom box-shadow values for the initial and scrolled states: `{ initial, scrolled }` */
  shadows: shadowShape,
}

export default ScrollableContainer
