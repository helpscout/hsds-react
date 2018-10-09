// @flow
import type { MessageThemeContext } from './types'
import React, { PureComponent } from 'react'
import styled from '../styled'
import Chat from './Chat'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import css from './styles/Embed.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  html: string,
}

type Context = MessageThemeContext

class Embed extends PureComponent<Props, Context> {
  static displayName = 'Message.Embed'

  render() {
    const { className, html, ...rest } = this.props
    const { theme } = this.context

    const componentClassName = classNames(
      'c-MessageEmbed',
      /* istanbul ignore next */
      // Tested, but Istanbul isn't picking it up.
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
}

namespaceComponent(COMPONENT_KEY.Embed)(Embed)

export default styled(Embed)(css)
