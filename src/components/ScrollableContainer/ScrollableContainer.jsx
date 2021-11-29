import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useScrollShadow from '../../hooks/useScrollShadow'
import useClientRect from '../../hooks/useClientRect'
import {
  ContainerScrollUI,
  HeaderUI,
  BodyUI,
  FooterUI,
  SimpleBarUI,
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
  withSimpleBar,
  ...rest
}) {
  const bodyRef = useRef(null)
  const [headerRect, headerEl, headerRef] = useClientRect()
  const [footerRect, footerEl, footerRef] = useClientRect()
  const [handleOnScroll] = useScrollShadow({
    bottomRef: footerEl,
    drawInitialShadowsDelay,
    scrollableRef: bodyRef,
    shadows,
    topRef: headerEl,
    withSimpleBar,
  })

  function renderBody() {
    if (body) {
      if (withSimpleBar) {
        const { children, className, ...rest } = body.props

        return (
          <SimpleBarUI
            height={calculateSimpleBarHeight(height, headerRect, footerRect)}
            onScroll={handleOnScroll}
            scrollableNodeProps={{ ref: bodyRef }}
            className={classNames('ScrollableContainer__Body', className)}
            {...rest}
          >
            {body}
          </SimpleBarUI>
        )
      }

      return (
        <BodyUI
          className={classNames(
            'ScrollableContainer__Body',
            body.props.className
          )}
          component={React.cloneElement(body, {
            ...body.props,
            ref: bodyRef,
          })}
          onScroll={handleOnScroll}
        />
      )
    }

    return null
  }

  return (
    <ContainerScrollUI
      className={classNames('c-ScrollableContainer', className)}
      data-cy={dataCy}
      width={width}
      height={height}
      {...rest}
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
      {renderBody()}
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

function calculateSimpleBarHeight(height, headerRect, footerRect) {
  let otherSectionsHeight = 0

  if (headerRect != null) {
    otherSectionsHeight += headerRect.height
  }
  if (footerRect != null) {
    otherSectionsHeight += footerRect.height
  }

  return `calc(${height} - ${otherSectionsHeight}px)`
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
  /** If you want to use 'simplebar-react' in the body, turn this flag on */
  withSimpleBar: PropTypes.bool,
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
