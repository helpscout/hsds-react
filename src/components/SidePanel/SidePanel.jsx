import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import Button from '../Button/'
import {
  AppContainerUI,
  FakeCardUI,
  FakeMainUI,
  FakeNavUI,
  FooterUI,
  BodyUI,
  ClosePanelButtonUI,
  HeaderUI,
  SidePanelUI,
  OverlayUI,
  SimpleModalOverlayUI,
  SimpleModalUI,
  CloseModalButtonUI,
} from './SidePanel.css'
import ChoiceGroup from '../ChoiceGroup'
import Icon from '../Icon'
import Radio from '../Radio'
import HuzzahBird from '@helpscout/hsds-illos/huzzah-bird'

function FakeApp() {
  const [showPanel, setShowPanel] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [panelDirection, setPanelDirection] = useState('right')
  const [step1Checked, setStep1Checked] = useState(false)
  const [step2Checked, setStep2Checked] = useState(false)
  const [step3Checked, setStep3Checked] = useState(false)

  function handleToggle() {
    setShowPanel(!showPanel)
  }
  return (
    <AppContainerUI>
      <FakeNavUI>
        <ChoiceGroup
          multiSelect={false}
          align="horizontal"
          value={panelDirection}
          onChange={value => {
            setPanelDirection(value)
          }}
        >
          <Radio label="Right" value="right" name="right" />
          <Radio label="Left" value="left" name="left" />
        </ChoiceGroup>
        <Button kind="secondary" size="xs" onClick={() => handleToggle()}>
          Toggle Panel
        </Button>
      </FakeNavUI>
      <FakeMainUI>
        <div>
          <FakeCardUI>Card 1</FakeCardUI>
          <FakeCardUI>Card 2</FakeCardUI>
        </div>
        <SidePanel
          show={showPanel}
          onClose={handleToggle}
          side={panelDirection}
          onMainActionClick={() => setShowModal(true)}
          mainActionDisabled={!step1Checked || !step2Checked || !step3Checked}
        >
          <FakeCardUI
            className={classNames('in-panel', step1Checked && 'checked')}
            onClick={() => {
              setStep1Checked(!step1Checked)
            }}
            tabIndex="0"
          >
            Step 1
          </FakeCardUI>
          <FakeCardUI
            className={classNames('in-panel', step2Checked && 'checked')}
            onClick={() => {
              setStep2Checked(!step2Checked)
            }}
            tabIndex="0"
          >
            Step 2
          </FakeCardUI>
          <FakeCardUI
            className={classNames('in-panel', step3Checked && 'checked')}
            onClick={() => {
              setStep3Checked(!step3Checked)
            }}
            tabIndex="0"
          >
            Step 3
          </FakeCardUI>
          <SimpleModal
            show={showModal}
            zIndex={1000}
            onClose={() => setShowModal(false)}
          >
            <HuzzahBird size={200} />
          </SimpleModal>
        </SidePanel>
      </FakeMainUI>
    </AppContainerUI>
  )
}

function SidePanel({
  children,
  className,
  mainActionButtonText = 'Start',
  onMainActionClick = noop,
  mainActionDisabled = false,
  onClose = noop,
  panelHeading = 'Review and Start',
  panelSubHeading = 'Complete the required details before going live',
  panelWidth = '400px',
  show = false,
  side = 'right',
  withHeader = true,
  withFooter = true,
  zIndex = 999,
}) {
  const [shouldRender, setRender] = useState(show)
  const panelRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (show) {
      setRender(true)
    }
  }, [show])

  function onAnimationEnd(e) {
    if (e.target === overlayRef.current) {
      if (!show) {
        setRender(false)

        if (overlayRef.current) {
          const focusableParent = getClosestFocusableParent(overlayRef.current)
          focusableParent.focus()
        }
      } else {
        panelRef.current && panelRef.current.focus()
      }
    }
  }

  function handleOverlayKeyDown(e) {
    if (shouldRender && e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  return shouldRender ? (
    <OverlayUI
      className={classNames(
        'SidePanel-Overlay',
        show && 'element-in',
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
        role="dialog"
        tabIndex="0"
      >
        <ClosePanelButtonUI onClick={onClose}>
          <Icon size={24} name="cross" />
        </ClosePanelButtonUI>
        {withHeader ? (
          <HeaderUI>
            <h1 id="sidepanel-header-heading" className="SidePanel__Heading">
              {panelHeading}
            </h1>
            <p className="SidePanel__Subheading">{panelSubHeading}</p>
          </HeaderUI>
        ) : null}
        <BodyUI>{children}</BodyUI>
        {withFooter ? (
          <FooterUI>
            <Button
              disabled={mainActionDisabled}
              kind="primary"
              size="xl"
              onClick={onMainActionClick}
            >
              {mainActionButtonText}
            </Button>
          </FooterUI>
        ) : null}
      </SidePanelUI>
    </OverlayUI>
  ) : null
}

function getClosestFocusableParent(element) {
  return (
    element.closest(
      'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"]:not([disabled]))'
    ) || document.body
  )
}

function SimpleModal({
  ariaLabelledBy = '',
  show = false,
  children,
  className,
  onClose = noop,
  zIndex = 999,
}) {
  const [shouldRender, setRender] = useState(show)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (show) {
      setRender(true)
    }
  }, [show, shouldRender])

  function onAnimationEnd(e) {
    if (e.target === overlayRef.current) {
      if (!show) {
        setRender(false)

        if (overlayRef.current) {
          const focusableParent = getClosestFocusableParent(overlayRef.current)
          focusableParent.focus()
        }
      } else {
        modalRef.current && modalRef.current.focus()
      }
    }
  }

  function handleOverlayKeyDown(e) {
    if (shouldRender && e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  return shouldRender ? (
    <SimpleModalOverlayUI
      className={classNames(
        'SimpleModal__Overlay',
        show && 'element-in',
        className
      )}
      onAnimationEnd={onAnimationEnd}
      onKeyDown={handleOverlayKeyDown}
      zIndex={zIndex}
      ref={overlayRef}
    >
      <SimpleModalUI
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        className="SimpleModal"
        data-cy="simple-modal"
        data-testid="simple-modal"
        id="simple-modal"
        role="dialog"
        ref={modalRef}
        tabIndex="0"
      >
        <CloseModalButtonUI onClick={onClose}>
          <Icon size={18} name="cross" />
        </CloseModalButtonUI>
        {children}
      </SimpleModalUI>
    </SimpleModalOverlayUI>
  ) : null
}

SidePanel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  mainActionButtonText: PropTypes.string,
  onClose: PropTypes.func,
  onMainActionClick: PropTypes.func,
  panelHeading: PropTypes.string,
  panelSubHeading: PropTypes.string,
  panelWidth: PropTypes.string,
  show: PropTypes.bool,
  side: PropTypes.oneOf(['left', 'right']),
  withFooter: PropTypes.bool,
  zIndex: PropTypes.number,
}

export default FakeApp
