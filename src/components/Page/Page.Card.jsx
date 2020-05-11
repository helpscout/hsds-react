import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { CardUI } from './Page.css'

export const Card = ({ children, className, ...rest }) => (
  <CardUI
    {...getValidProps(rest)}
    className={classNames('c-PageCard', className)}
  >
    {children}
  </CardUI>
)

Card.displayName = 'Page.Card'

export default Card
