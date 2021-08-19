import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'
import { noop } from '../../utilities/other'
import Button from '../Button/'
import { BodyUI, FooterUI, HeaderUI } from './SidePanel.layouts.css'

export function HeaderAndFooter({
  children,
  mainActionButtonText = 'Start',
  onMainActionClick = noop,
  mainActionDisabled = false,
  panelHeading = 'Review and Start',
  panelHeadingId = '',
  panelSubHeading = 'Complete the required details before going live',
}) {
  const headerRef = useRef(null)
  const bodyRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      const { isBottomScrolled } = handleShadows(bodyRef)

      if (isBottomScrolled) {
        footerRef.current.classList.add('with-shadow')
      }
    }, 100)
  }, [bodyRef])

  const handleOnScroll = throttle(e => {
    const { isTopScrolled, isBottomScrolled } = handleShadows(bodyRef)

    if (isTopScrolled) {
      headerRef.current.classList.add('with-shadow')
    } else {
      headerRef.current.classList.remove('with-shadow')
    }

    if (isBottomScrolled) {
      footerRef.current.classList.add('with-shadow')
    } else {
      footerRef.current.classList.remove('with-shadow')
    }
  }, 100)

  return (
    <>
      <HeaderUI className="SidePanel__Header" ref={headerRef}>
        <h1 id={panelHeadingId} className="SidePanel__Heading">
          {panelHeading}
        </h1>
        <p className="SidePanel__Subheading">{panelSubHeading}</p>
      </HeaderUI>

      <BodyUI
        className="SidePanel__Body"
        ref={bodyRef}
        onScroll={handleOnScroll}
      >
        {children}
      </BodyUI>

      <FooterUI className="SidePanel__Footer" ref={footerRef}>
        <Button
          className="SidePanel__MainAction"
          disabled={mainActionDisabled}
          kind="primary"
          onClick={onMainActionClick}
          size="xl"
        >
          {mainActionButtonText}
        </Button>
      </FooterUI>
    </>
  )
}

function handleShadows(scrollableRef) {
  if (!scrollableRef.current) {
    return {
      isTopScrolled: false,
      isBottomScrolled: false,
    }
  }

  const scrollable = scrollableRef.current
  const style = window.getComputedStyle(scrollable)
  const scrollableScrollHeight = scrollable.scrollHeight
  const scrollableHeight = scrollable.offsetHeight
  const scrollablePaddingTop =
    Number.parseInt(style.paddingTop.replace('px', ''), 10) - 10
  const scrollablePaddingBottom =
    Number.parseInt(style.paddingBottom.replace('px', ''), 10) + 10

  return {
    isTopScrolled: scrollable.scrollTop - scrollablePaddingTop > 0,
    isBottomScrolled:
      scrollable.scrollTop + scrollableHeight + scrollablePaddingBottom <
      scrollableScrollHeight,
  }
}

HeaderAndFooter.propTypes = {
  /** Custom classname on this component */
  className: PropTypes.string,
  /** If the default footer is present, this is the label text for the button */
  mainActionButtonText: PropTypes.string,
  /** If the default footer is present, this disables the button */
  mainActionDisabled: PropTypes.bool,
  /** If the default Header included, this is the Heading */
  panelHeading: PropTypes.string,
  /** ID for the H1, make sure it matches the ariaLabelledBy from the SidePanel */
  panelHeadingId: PropTypes.string,
  /** If the default Header included, this is the Subheading */
  panelSubHeading: PropTypes.string,
  /** If the default footer is present, this is the callback for the button */
  onMainActionClick: PropTypes.func,
}
