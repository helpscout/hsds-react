// @flow
import type { MessageChat } from './types'
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ChatBlock from './ChatBlock'
import styled from '../styled'
import PreviewCardContext from '../PreviewCard/Context'
import classNames from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import css from './styles/Content.css.js'
import { COMPONENT_KEY } from './utils'

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
