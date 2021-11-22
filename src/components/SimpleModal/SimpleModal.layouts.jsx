import React from 'react'
import ScrollableContainer from '../ScrollableContainer'
import {
  BodyUI,
  FooterUI,
  HeaderUI,
  ScrollableContainerUI,
} from './SimpleModal.layouts.css'

export function HeaderAndFooter({ headerContent, footerContent, children }) {
  return (
    <ScrollableContainerUI
      width="100%"
      height="100%"
      header={<HeaderUI>{headerContent}</HeaderUI>}
      body={<BodyUI>{children}</BodyUI>}
      footer={<FooterUI>{footerContent}</FooterUI>}
    />
  )
}
