// @flow
import type { MessageThemeContext } from './types'
import React from 'react'
import styled from '../styled'
import Chat from './Chat'
import classNames from '../../utilities/classNames'
import css from './styles/Embed.css.js'

type Props = {
  className?: string,
  html: string,
}

type Context = MessageThemeContext

export const Embed = (props: Props, context: Context) => {
  const { className, html, ...rest } = props
  const { theme } = context

  const componentClassName = classNames(
    'c-MessageEmbed',
    theme && `is-theme-${theme}`,
    className
  )

  return (
    <Chat
      {...rest}
      bubbleClassName="c-MessageEmbed__bubble"
      className={componentClassName}
    >
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="c-MessageEmbed__html"
      />
    </Chat>
  )
}

export default styled(Embed)(css)
