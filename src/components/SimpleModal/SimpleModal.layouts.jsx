import React from 'react'
import classNames from 'classnames'
import ScrollableContainer from '../ScrollableContainer'
import { BodyUI, HeaderUI, FooterUI } from './SimpleModal.layouts.css'

export function HeaderAndFooter({
  children,
  heading,
  header,
  footer,
  ...rest
}) {
  return (
    <ScrollableContainer
      width="100%"
      height="100%"
      header={
        <HeaderUI
          className={classNames(
            'SimpleModal__header',
            header && 'with-custom-header-content'
          )}
        >
          {header ? header : <h1>{heading}</h1>}
        </HeaderUI>
      }
      body={<BodyUI className="SimpleModal__body">{children}</BodyUI>}
      footer={
        footer ? (
          <FooterUI className={'SimpleModal__footer'}>{footer}</FooterUI>
        ) : null
      }
      {...rest}
    />
  )
}
