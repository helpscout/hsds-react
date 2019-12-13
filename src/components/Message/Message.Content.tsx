import * as React from 'react'
import { MessageChat } from './Message.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PreviewCardContext from '../PreviewCard/PreviewCard.Context'
import { classNames } from '../../utilities/classNames'
import { ContentUI } from './styles/Content.css'

type Props = MessageChat

const Content = (props: Props) => {
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
    type,
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
    type,
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

Content.displayName = 'MessageContent'

export default Content
