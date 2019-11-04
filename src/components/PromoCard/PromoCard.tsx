import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './PromoCard.utils'
import { PromoCardUI, BorderUI, ContentUI } from './styles/PromoCard.css'

// Refactor this when FluffyCard is converted to TypeScript
export type FluffyCardTextAlign = 'left' | 'center' | 'right'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  promoColor?: string
  textAlign: FluffyCardTextAlign
}

export class PromoCard extends React.PureComponent<Props> {
  static className = 'c-PromoCard'
  static defaultProps = {
    innerRef: noop,
    promoColor: 'blue',
    textAlign: 'left',
  }

  getClassName() {
    const { className } = this.props
    return classNames(PromoCard.className, className)
  }

  render() {
    const { children, innerRef, promoColor, ...rest } = this.props

    return (
      <PromoCardUI {...rest} className={this.getClassName()} ref={innerRef}>
        <BorderUI borderColor={promoColor} />
        <ContentUI>{children}</ContentUI>
      </PromoCardUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(PromoCard)

export default PropConnectedComponent
