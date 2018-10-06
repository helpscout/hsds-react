// @flow
import type { EmotionSize } from './types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import EMOTICONS from './emoticons'
import { BEM, classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { EmoticonUI } from './styles/Emoticon.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  center: boolean,
  clickable: boolean,
  isActive: boolean,
  isDisabled: boolean,
  inline: boolean,
  name: string,
  title?: string,
  size?: EmotionSize,
}

class Emoticon extends Component<Props> {
  static defaultProps = {
    center: false,
    clickable: true,
    inline: false,
    isActive: true,
    isDisabled: false,
    name: 'happy',
    size: 'md',
    title: '',
  }

  render() {
    const {
      className,
      center,
      clickable,
      isActive,
      isDisabled,
      inline,
      name,
      title,
      size,
      ...rest
    } = this.props

    const src = { __html: EMOTICONS[name] }
    const componentClassName = classNames(
      'c-Emoticon',
      !clickable && 'is-noInteract',
      center && 'is-center',
      inline && 'is-inline',
      isActive && 'is-active',
      isDisabled && 'is-disabled',
      size && `is-${size}`,
      className
    )

    const iconClassName = classNames(
      BEM(componentClassName).element('icon'),
      'c-Emoticon__icon'
    )

    return (
      <EmoticonUI {...getValidProps(rest)} className={componentClassName}>
        <span
          className={iconClassName}
          dangerouslySetInnerHTML={src}
          title={title}
        />
      </EmoticonUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Emoticon)

export default Emoticon
