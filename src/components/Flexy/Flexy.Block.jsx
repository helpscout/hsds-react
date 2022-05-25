import React from 'react'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { FlexyBlockUI } from './Flexy.css'

export const FlexyBlock = ({ children, className = '', ...rest }) => (
  <FlexyBlockUI
    {...getValidProps(rest)}
    className={classNames('c-Flexy__block', className)}
  >
    {children}
  </FlexyBlockUI>
)

FlexyBlock.defaultProps = {
  'data-cy': 'FlexyBlock',
}

export default FlexyBlock
