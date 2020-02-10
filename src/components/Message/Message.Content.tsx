import * as React from 'react'
import { MessageChat } from './Message.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ChatBlock from './Message.ChatBlock'
import styled from '../styled'
import PreviewCardContext from '../PreviewCard/PreviewCard.Context'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import css from './styles/Content.css'
import { COMPONENT_KEY } from './Message.utils'

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
    <ChatBlock {...chatProps} className={componentClassName}>
      <PreviewCardContext.Provider value={contextProps}>
        <div {...getValidProps(rest)} className={innerComponentClassName}>
          {children}
        </div>
      </PreviewCardContext.Provider>
    </ChatBlock>
  )
}

namespaceComponent(COMPONENT_KEY.Content)(Content)

export default styled(Content)(css)
