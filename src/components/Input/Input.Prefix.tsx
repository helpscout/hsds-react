import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Input.utils'
import { PrefixUI } from './styles/Input.css'

export interface Props {
  className?: string
  isSeamless: boolean
}

class Prefix extends React.PureComponent<Props> {
  static defaultProps = {
    isSeamless: false,
  }

  render() {
    const { className, isSeamless, ...rest } = this.props

    const componentClassName = classNames(
      'c-InputPrefix',
      'c-Input__item',
      'c-Input__prefix',
      isSeamless && 'is-seamless',
      className
    )

    return <PrefixUI {...getValidProps(rest)} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY.Prefix)(Prefix)

export default Prefix
