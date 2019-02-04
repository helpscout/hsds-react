import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './utils'
import { PromoCardUI, BorderUI, ContentUI } from './styles/PromoCard.css'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  promoColor?: string
}

export class PromoCard extends React.PureComponent<Props> {
  static className = 'c-PromoCard'
  static defaultProps = {
    innerRef: noop,
    promoColor: 'blue',
  }

  getClassName() {
    const { className } = this.props
    return classNames(PromoCard.className, className)
  }

  render() {
    const { children, innerRef, promoColor, ...rest } = this.props

    if (!children) {
      return null
    }

    return (
      <PromoCardUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <BorderUI borderColor={promoColor} />
        <ContentUI>{children}</ContentUI>
      </PromoCardUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(PromoCard)

export default PropConnectedComponent
