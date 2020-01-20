import * as React from 'react'

import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Illo from '../Illo'
import { classNames } from '../../utilities/classNames'

import {
  BlankSlateUI,
  HeadingUI,
  TextUI,
  IlloUI,
} from './styles/BlankSlate.css'

interface Props {
  className?: string
  message?: string | React.ReactNode
  title?: string
  illo?: React.ReactNode
  illoName?: string
  illoSize?: number
  lightBackground?: boolean
  alignTop?: boolean
}

const getIllo = ({ illo, illoName, illoSize }: Props) => {
  let content: React.ReactNode = null

  if (illo) {
    content = illo
  } else if (illoName) {
    content = <Illo name={illoName} size={illoSize} />
  }

  return content ? <IlloUI>{content}</IlloUI> : content
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
      illo,
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
        {getIllo({ illo, illoName, illoSize })}
        {title && <HeadingUI size="h3">{title}</HeadingUI>}
        {message && <TextUI>{message}</TextUI>}
      </BlankSlateUI>
    )
  }
}

export default BlankSlate
