import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

import { SuffixUI } from './styles/Input.css.js'

export interface Props {
  className?: string;
  isSeamless: boolean;
}

class Suffix extends Component<Props> {
  static defaultProps = {
    isSeamless: false,
  }

  render() {
    const { className, isSeamless, ...rest } = this.props

    const componentClassName = classNames(
      'c-InputSuffix',
      isSeamless && 'is-seamless',
      className
    )

    return <SuffixUI {...getValidProps(rest)} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY.Suffix)(Suffix)

export default Suffix
