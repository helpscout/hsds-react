import * as React from 'react'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'

import { COMPONENT_KEY } from './utils'
import { BlankSlateUI, HeadingUI, TextUI, IlloUI } from './BlankSlate.css'

interface Props {
  className?: string
  message?: string | React.ReactNode
  title?: string
  illoName?: string
  illoSize?: number
  lightBackground?: boolean
  alignTop?: boolean
}

class BlankSlate extends React.PureComponent<Props> {
  static defaultProps = {
    lightBackground: false,
    alignTop: false,
    illoSize: 80,
  }

  render() {
    const {
      className,
      children,
      illoName,
      illoSize,
      title,
      message,
      lightBackground,
      alignTop,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-BlankSlate',
      lightBackground ? 'with-light-background' : '',
      alignTop ? 'align-top' : '',
      className
    )

    return (
      <BlankSlateUI {...getValidProps(rest)} className={componentClassName}>
        {illoName && <IlloUI name={illoName} size={illoSize} />}
        {title && <HeadingUI size="h3">{title}</HeadingUI>}
        {message && <TextUI>{message}</TextUI>}
      </BlankSlateUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(BlankSlate)

export default BlankSlate
