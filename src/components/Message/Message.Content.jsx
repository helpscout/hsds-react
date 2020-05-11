import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PreviewCardContext from '../PreviewCard/PreviewCard.Context'
import { classNames } from '../../utilities/classNames'
import { ContentUI } from './Message.Content.css'

const Content = props => {
  const {
    children,
    className,
    from,
    isNote,
    ltr,
    read,
    rtl,
    timestamp,
    to,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-MessageContent',
    isNote && 'is-note',
    className
  )

  const innerComponentClassName = classNames(
    'c-MessageContent__content',
    from && 'is-from',
    isNote && 'is-note',
    ltr && !rtl && 'is-ltr',
    !ltr && rtl && 'is-rtl',
    to && 'is-to'
  )

  const chatProps = {
    from,
    ltr,
    read,
    rtl,
    timestamp,
    to,
  }

  const contextProps = {
    isNote,
  }

  return (
    <ContentUI {...chatProps} className={componentClassName}>
      <PreviewCardContext.Provider value={contextProps}>
        <div {...getValidProps(rest)} className={innerComponentClassName}>
          {children}
        </div>
      </PreviewCardContext.Provider>
    </ContentUI>
  )
}

Content.propTypes = {
  className: PropTypes.string,
  from: PropTypes.any,
  isNote: PropTypes.bool,
  ltr: PropTypes.bool,
  onClick: PropTypes.func,
  read: PropTypes.bool,
  rtl: PropTypes.bool,
  timestamp: PropTypes.string,
  to: PropTypes.any,
}

Content.displayName = 'MessageContent'

export default Content
