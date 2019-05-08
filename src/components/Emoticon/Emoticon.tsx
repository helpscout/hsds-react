import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import EMOTICONS from './Emoticon.icons'
import { EmoticonName, EmoticonSize } from './Emoticon.types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { EmoticonUI, FaceUI, IconUI } from './styles/Emoticon.css'
import { COMPONENT_KEY } from './Emoticon.utils'

export interface Props {
  className?: string
  center: boolean
  clickable: boolean
  isActive: boolean
  isDisabled: boolean
  innerRef: (node: HTMLElement) => void
  inline: boolean
  name: EmoticonName
  title?: string
  size?: EmoticonSize
  withAnimation: boolean
}

export class Emoticon extends React.PureComponent<Props> {
  static defaultProps = {
    center: false,
    clickable: true,
    inline: false,
    isActive: true,
    isDisabled: false,
    innerRef: noop,
    name: 'happy',
    role: 'presentation',
    size: 'md',
    title: '',
    withAnimation: true,
  }

  static className = 'c-Emoticon'

  getClassNames() {
    const {
      className,
      clickable,
      center,
      isActive,
      isDisabled,
      inline,
      name,
      size,
      withAnimation,
    } = this.props

    return classNames(
      Emoticon.className,
      !clickable && 'is-noInteract',
      center && 'is-center',
      inline && 'is-inline',
      isActive && 'is-active',
      isDisabled && 'is-disabled',
      name && `is-${name}`,
      size && `is-${size}`,
      withAnimation && 'is-withAnimation',
      className
    )
  }

  render() {
    const {
      className,
      center,
      clickable,
      innerRef,
      isActive,
      isDisabled,
      inline,
      name,
      title,
      size,
      ...rest
    } = this.props

    const src = { __html: EMOTICONS[name] }

    return (
      <EmoticonUI
        {...getValidProps(rest)}
        className={this.getClassNames()}
        innerRef={innerRef}
      >
        <Face isActive={isActive} isDisabled={isDisabled}>
          <IconUI
            className="c-Emoticon__icon"
            dangerouslySetInnerHTML={src}
            title={title}
          />
        </Face>
      </EmoticonUI>
    )
  }
}

const Face = ({ isActive, isDisabled, ...rest }) => {
  const className = classNames(
    'c-Emoticon__face',
    isActive && 'is-active',
    isDisabled && 'is-disabled'
  )

  return <FaceUI {...rest} className={className} />
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Emoticon)

export default PropConnectedComponent
