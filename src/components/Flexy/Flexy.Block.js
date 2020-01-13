import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { BlockUI } from './styles/Flexy.Block.css'

export const Block = ({ children, className, ...rest }) => (
  <BlockUI
    {...getValidProps(rest)}
    className={classNames('c-Flexy__block', className)}
  >
    {children}
  </BlockUI>
)

Block.displayName = 'FlexyBlock'

export default Block
