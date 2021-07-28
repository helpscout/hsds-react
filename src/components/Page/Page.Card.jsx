import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { CardUI } from './Page.css'

export const PageCard = ({ children, className, ...rest }) => (
  <CardUI
    {...getValidProps(rest)}
    className={classNames('c-PageCard', className)}
  >
    {children}
  </CardUI>
)

PageCard.defaultProps = {
  'data-cy': 'PageCard',
}

export default PageCard
