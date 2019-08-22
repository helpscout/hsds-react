import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import css from './styles/Badge.css'
import { UIStatus } from '../../constants/types'

type BadgeDisplay = 'block' | 'inlineBlock'
type Props = {
  children?: any
  className?: string
  count?: boolean
  display: BadgeDisplay
  inverted: boolean
  isSquare?: boolean
  size?: string
  status?: UIStatus
  style?: object
  textColor?: string
  white?: boolean
}

class Badge extends React.Component<Props> {
  static defaultProps = {
    display: 'inlineBlock',
    inverted: false,
    color: '',
    textColor: '',
  }

  static displayName = 'Badge'

  render() {
    const {
      children,
      color,
      count,
      className,
      display,
      inverted,
      isSquare,
      size,
      status,
      textColor,
      white,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Badge',
      count && 'is-count',
      display && `is-display-${display}`,
      isSquare && `is-square`,
      size && `is-${size}`,
      status && `is-${status}`,
      white && 'is-white',
      className
    )

    return (
      <BadgeUI
        {...{ ...getValidProps(rest), color, inverted, textColor }}
        className={componentClassName}
      >
        {children}
      </BadgeUI>
    )
  }
}
Badge.displayName = 'Badge'

export default styled(Badge)(css)
