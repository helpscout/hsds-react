import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { CardUI } from './styles/Page.Card.css'
import { COMPONENT_KEY } from './Page.utils'
import { PageCardProps } from './Page.types'

export class Card extends React.PureComponent<PageCardProps> {
  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-PageCard', className)

    return (
      <CardUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </CardUI>
    )
  }
}

export default propConnect(COMPONENT_KEY.Card)(Card)
