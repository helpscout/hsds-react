import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useAnimatedRender from '../../hooks/useAnimatedRender'
import { noop } from '../../utilities/other'
import { manageTrappedFocus } from '../../utilities/focus'
import {
  BodyUI,
  ClosePanelButtonUI,
  FooterUI,
  HeaderUI,
  OverlayUI,
  SidePanelUI,
} from './SidePanel.css'
import Button from '../Button/'
import Icon from '../Icon'

function SidePanel({
  children,
  className,
  focusPanelOnShow = true,
  mainActionButtonText = 'Start',
  onMainActionClick = noop,
  mainActionDisabled = false,
  onClose = noop,
  panelHeading = 'Review and Start',
  panelSubHeading = 'Complete the required details before going live',
  panelWidth = '400px',
  show = false,
  side = 'right',
  trapFocus = false,
  withHeader = true,
  withFooter = true,
  withOverlay = true,
  zIndex = 999,
}) {
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  const [shouldRender, onAnimationEnd] = useAnimatedRender(
    show,
    overlayRef,
    focusPanelOnShow && panelRef
  )

  function handleOverlayKeyDown(e) {
    if (shouldRender && e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    } else if (e.key === 'Tab' && trapFocus && panelRef.current) {
      manageTrappedFocus(panelRef.current, e)
    }
  }

  return shouldRender ? (
    <OverlayUI
      className={classNames(
        'SidePanel-Overlay',
        show && 'element-in',
        !withOverlay && 'no-overlay',
        side,
        className
      )}
      data-cy="sidepanel-overlay"
      data-testid="sidepanel-overlay"
      onAnimationEnd={onAnimationEnd}
      onKeyDown={handleOverlayKeyDown}
      ref={overlayRef}
      zIndex={zIndex}
    >
      <SidePanelUI
        aria-modal="true"
        aria-labelledby="sidepanel-header-heading"
        className="SidePanel"
        data-cy="sidepanel"
        data-testid="sidepanel"
        id="sidepanel"
        panelWidth={panelWidth}
        ref={panelRef}
        onFocus={e => {
          console.log('FOCUSED')
        }}
        role="dialog"
        tabIndex="0"
      >
        <ClosePanelButtonUI
          className="SidePanel__CloseButton"
          onClick={onClose}
        >
          <Icon size={24} name="cross" />
        </ClosePanelButtonUI>
        {withHeader ? (
          <HeaderUI className="SidePanel__Header">
            <h1 id="sidepanel-header-heading" className="SidePanel__Heading">
              {panelHeading}
            </h1>
            <p className="SidePanel__Subheading">{panelSubHeading}</p>
          </HeaderUI>
        ) : null}
        <BodyUI className="SidePanel__Body">{children}</BodyUI>
        {withFooter ? (
          <FooterUI className="SidePanel__Footer">
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
        ) : null}
      </SidePanelUI>
    </OverlayUI>
  ) : null
}

SidePanel.propTypes = {
  /** Content to be rendered inside the panel body */
  children: PropTypes.any,
  /** Custom classname on this component */
  className: PropTypes.string,
  /** If you don't want the focus to be moved to the Panel when it enters */
  focusPanelOnShow: PropTypes.bool,
  /** If the default footer is present, this is the label text for the button */
  mainActionButtonText: PropTypes.string,
  /** If the default footer is present, this disables the button */
  mainActionDisabled: PropTypes.bool,
  /** Function that gets called when clicking the `x` button and when pressing `esc`, use this to close the panel in your app */
  onClose: PropTypes.func,
  /** If the default footer is present, this is the callback for the button */
  onMainActionClick: PropTypes.func,
  /** If the default Header included, this is the Heading */
  panelHeading: PropTypes.string,
  /** If the default Header included, this is the Subheading */
  panelSubHeading: PropTypes.string,
  /** How wide the panel should be */
  panelWidth: PropTypes.string,
  /** Control whether the panel is open or close */
  show: PropTypes.bool,
  /** Which side of the screen to render the panel in */
  side: PropTypes.oneOf(['left', 'right']),
  /** Whether to restrict focus to elements inside the modal */
  trapFocus: PropTypes.bool,
  /** Enable a default footer that includes a big CTA button */
  withFooter: PropTypes.bool,
  /** In case you don't want the "overlay" */
  withOverlay: PropTypes.bool,
  /** Customize the z-index */
  zIndex: PropTypes.number,
}

export default SidePanel
