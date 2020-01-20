import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { PromoCardUI, BorderUI } from './styles/PromoCard.css'

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
        <div>{children}</div>
      </PromoCardUI>
    )
  }
}

export default PromoCard
