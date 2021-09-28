import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useAnimatedRender from '../../hooks/useAnimatedRender'
import useClickOutside from '../../hooks/useClickOutside'
import { noop } from '../../utilities/other'
import { manageTrappedFocus } from '../../utilities/focus'
import {
  ContentUI,
  ClosePanelButtonUI,
  OverlayUI,
  SidePanelUI,
} from './SidePanel.css'
import Icon from '../Icon'

function SidePanel({
  ariaLabelledBy = '',
  children,
  className,
  closeOnClickOutside = false,
  'data-cy': dataCy = 'SidePanel',
  focusPanelOnShow = true,
  onClose = noop,
  panelWidth = '400px',
  show = false,
  side = 'right',
  trapFocus = false,
  withHeader = true,
  withFooter = true,
  withOverlay = true,
  zIndex = 999,
  ...rest
}) {
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  const [shouldRender, onAnimationEnd] = useAnimatedRender(
    show,
    overlayRef,
    focusPanelOnShow && panelRef
  )

  useClickOutside(getClickOutsideRef(), () => {
    onClose()
  })

  function getClickOutsideRef() {
    if (closeOnClickOutside === 'panel') {
      return panelRef
    }
    if (closeOnClickOutside === 'overlay') {
      return overlayRef
    }

    return null
  }

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
      onAnimationStart={e => {
        if (e.target === overlayRef.current) {
          setTimeout(() => {
            panelRef.current.classList.add('element-in')
          }, 100)
        }
      }}
      onAnimationEnd={onAnimationEnd}
      onKeyDown={handleOverlayKeyDown}
      ref={overlayRef}
      zIndex={zIndex}
    >
      <SidePanelUI
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        className="SidePanel"
        dataCy={dataCy}
        data-testid="sidepanel"
        id="sidepanel"
        panelWidth={panelWidth}
        ref={panelRef}
        role="dialog"
        tabIndex="0"
        {...rest}
      >
        <ClosePanelButtonUI
          aria-label="close side panel button"
          className="SidePanel__CloseButton"
          onClick={onClose}
        >
          <Icon size={24} name="cross" />
        </ClosePanelButtonUI>
        <ContentUI className="SidePanel__Content">{children}</ContentUI>
      </SidePanelUI>
    </OverlayUI>
  ) : null
}

SidePanel.propTypes = {
  /** If you include a Heading in the SidePanel, give it the same ID as the value you put here. Otherwise add a `aria-label` with a description */
  ariaLabelledBy: PropTypes.string,
  /** Content to be rendered inside the panel body */
  children: PropTypes.any,
  /** Custom classname on this component */
  className: PropTypes.string,
  /** Whether to close the Panel when clicking outside of it, pass a string with value "panel" if clicking ouside the actual Panel, or "overlay" if clicking outside the overlay should close it (in case of "contained panels") */
  closeOnClickOutside: PropTypes.oneOf([null, undefined, 'panel', 'overlay']),
  /** Data attr applied for Cypress tests */
  'data-cy': PropTypes.string,
  /** If you don't want the focus to be moved to the Panel when it enters */
  focusPanelOnShow: PropTypes.bool,
  /** Function that gets called when clicking the `x` button and when pressing `esc`, use this to close the panel in your app */
  onClose: PropTypes.func,
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
