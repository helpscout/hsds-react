/* istanbul ignore file */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'
import Button from '../Button/'
import { BodyUI, FooterUI, HeaderUI } from './SidePanel.layouts.css'
import useScrollShadow from '../../hooks/useScrollShadow'

export function HeaderAndFooter({
  children,
  mainActionButtonContent = 'Start',
  mainActionDisabled = false,
  mainActionNode = noop,
  onMainActionClick = noop,
  panelHeading = 'Review and Start',
  panelHeadingId = '',
  panelSubHeading = 'Complete the required details before going live',
}) {
  const headerRef = useRef(null)
  const bodyRef = useRef(null)
  const footerRef = useRef(null)
  const [handleOnScroll] = useScrollShadow({
    bottomRef: footerRef,
    scrollableRef: bodyRef,
    topRef: headerRef,
    shadows: { initial: 'none' },
    drawInitialShadowsDelay: 300,
  })

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
          size="xxl"
          theme="blue"
          className="SidePanel__MainAction"
          disabled={mainActionDisabled}
          onClick={onMainActionClick}
          ref={mainActionNode}
        >
          {mainActionButtonContent}
        </Button>
      </FooterUI>
    </>
  )
}

HeaderAndFooter.propTypes = {
  /** If the default footer is present, this is the label text for the button */
  mainActionButtonContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  /** If the default footer is present, this disables the button */
  mainActionDisabled: PropTypes.bool,
  /** Retrieve the Main Action button node */
  mainActionNode: PropTypes.func,
  /** If the default Header included, this is the Heading */
  panelHeading: PropTypes.string,
  /** ID for the H1, make sure it matches the ariaLabelledBy from the SidePanel */
  panelHeadingId: PropTypes.string,
  /** If the default Header included, this is the Subheading */
  panelSubHeading: PropTypes.string,
  /** If the default footer is present, this is the callback for the button */
  onMainActionClick: PropTypes.func,
}
