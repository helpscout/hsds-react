import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Input.utils'
import { SuffixUI } from './styles/Input.css'
import { InputSuffixProps } from './Input.types'

class Suffix extends React.PureComponent<InputSuffixProps> {
  static defaultProps = {
    isAction: false,
    isSeamless: false,
  }

  render() {
    const { className, isAction, isSeamless, ...rest } = this.props

    const componentClassName = classNames(
      'c-InputSuffix',
      'c-Input__item',
      'c-Input__suffix',
      isAction && 'is-action',
      isSeamless && 'is-seamless',
      className
    )

    return <SuffixUI {...getValidProps(rest)} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY.Suffix)(Suffix)

export default Suffix
