import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useScrollShadow from '../../hooks/useScrollShadow'
import useMeasureNode from '../../hooks/useMeasureNode'
import { noop } from '../../utilities/other'
import {
  ContainerScrollUI,
  HeaderUI,
  BodyUI,
  FooterUI,
  SimpleBarUI,
} from './ScrollableContainer.css'

function ScrollableContainer({
  body,
  className,
  'data-cy': dataCy = 'ScrollableContainer',
  drawInitialShadowsDelay = 0,
  footer,
  forwardedRef,
  header,
  height = '500px',
  onScroll,
  onScrollableSectionsStateChange = noop,
  shadows = {},
  width = '300px',
  withResizeObservers = {},
  withSimpleBar,
  ...rest
}) {
  const bodyRef = useRef(null)
  const [headerRect, headerEl, headerRef, headerObserverRef] = useMeasureNode({
    observeSize: Boolean(withResizeObservers.header),
  })
  const [footerRect, footerEl, footerRef, footerObserverRef] = useMeasureNode({
    observeSize: Boolean(withResizeObservers.footer),
  })

  const [handleOnScroll, isTopScrolled, isBottomScrolled] = useScrollShadow({
    bottomRef: footerEl,
    drawInitialShadowsDelay,
    scrollableRef: bodyRef,
    shadows,
    topRef: headerEl,
    withSimpleBar,
  })

  useEffect(() => {
    onScrollableSectionsStateChange({
      isTopScrolled,
      isBottomScrolled,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTopScrolled, isBottomScrolled])

  // Cleanup observers if any
  useEffect(() => {
    const footerObserver = footerObserverRef.current
    const headerObserver = headerObserverRef.current

    return () => {
      if (footerObserver != null && footerObserver instanceof ResizeObserver) {
        footerObserver.disconnect()
      }
      if (headerObserver != null && headerObserver instanceof ResizeObserver) {
        headerObserver.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function renderSection(section) {
    let sectionContent
    let SectionUI
    let sectionRef

    if (section === 'header') {
      sectionContent = header
      SectionUI = HeaderUI
      sectionRef = headerRef
    } else if (section === 'footer') {
      sectionContent = footer
      SectionUI = FooterUI
      sectionRef = footerRef
    } else if (section === 'body') {
      sectionContent = body
      SectionUI = BodyUI
      sectionRef = bodyRef
    }

    if (sectionContent) {
      if (section === 'body' && withSimpleBar) {
        const { children, className, ...rest } = body.props || {}

        return (
          <SimpleBarUI
            $height={calculateSimpleBarHeight(height, headerRect, footerRect)}
            scrollableNodeProps={{
              ref: bodyRef,
              onScroll: e => {
                handleOnScroll()
                onScroll && onScroll(e)
              },
            }}
            className={classNames('ScrollableContainer__body', className)}
            {...rest}
          >
            {body}
          </SimpleBarUI>
        )
      }

      const { children, className, ...rest } = sectionContent.props || {}
      const component = React.isValidElement(sectionContent)
        ? React.cloneElement(sectionContent, {
            ...rest,
            ref: sectionRef,
          })
        : React.createElement(
            'div',
            {
              ref: sectionRef,
            },
            [sectionContent]
          )

      return (
        <SectionUI
          className={classNames(`ScrollableContainer__${section}`, className)}
          component={component}
          onScroll={
            section === 'body'
              ? e => {
                  handleOnScroll()
                  onScroll && onScroll(e)
                }
              : null
          }
        />
      )
    }

    return null
  }

  return (
    <ContainerScrollUI
      className={classNames('c-ScrollableContainer', className)}
      data-cy={dataCy}
      $width={width}
      $height={height}
      ref={forwardedRef}
      {...rest}
    >
      {renderSection('header')}
      {renderSection('body')}
      {renderSection('footer')}
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

const resizeObserversShape = PropTypes.shape({
  header: PropTypes.bool,
  footer: PropTypes.bool,
})

ScrollableContainer.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** An element or content to render as the body (content), this is the one that gets scrolled */
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** If you're animating a component in, the scrollable element (body) might not have its height determined yet until that animation completes, pass a number in ms equal or larger to the length of the animation to account for this and give React time to get the size. */
  drawInitialShadowsDelay: PropTypes.number,
  /** An element or content to render fixed at the bottom of the container */
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** An element or content to render fixed at the top of the container */
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /** The container height, can also override with a styled component instead */
  height: PropTypes.string,
  /** Callback on the scroll event */
  onScroll: PropTypes.func,
  /** Returns the scrolled state of the top and bottom sections when they change `{ isTopScrolled, isBottomScrolled }` */
  onScrollableSectionsStateChange: PropTypes.func,
  /** Custom box-shadow values for the initial and scrolled states: `{ initial, scrolled }` */
  shadows: shadowShape,
  /** The container width, can also override with a styled component instead */
  width: PropTypes.string,
  /** If your header or footer change height dimensions on scroll, use `ResizeObserver` to have smooth transition, allows to set the observer in both sections or just one: `{ header: true, footer: true }` */
  withResizeObservers: resizeObserversShape,
  /** If you want to use 'simplebar-react' in the body, turn this flag on */
  withSimpleBar: PropTypes.bool,
}

export default React.forwardRef((props, ref) => {
  return <ScrollableContainer forwardedRef={ref} {...props} />
})
