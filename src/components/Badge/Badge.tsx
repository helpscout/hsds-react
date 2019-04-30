import React from 'react'
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
  size?: string
  status?: UIStatus
  isSquare?: boolean
  white?: boolean
}

const Badge = (props: Props) => {
  const {
    children,
    count,
    className,
    display,
    isSquare,
    size,
    status,
    white,
    ...rest
  } = props

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
    <div {...getValidProps(rest)} className={componentClassName}>
      {children}
    </div>
  )
}

Badge.defaultProps = {
  display: 'inlineBlock',
}
Badge.displayName = 'Badge'

export default styled(Badge)(css)
