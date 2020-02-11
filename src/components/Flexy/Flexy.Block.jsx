import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FlexyBlockUI } from './Flexy.css'

export const Block = ({ children, className = '', ...rest }) => (
  <FlexyBlockUI
    {...getValidProps(rest)}
    className={classNames('c-Flexy__block', className)}
  >
    {children}
  </FlexyBlockUI>
)

Block.displayName = 'FlexyBlock'

export default Block
