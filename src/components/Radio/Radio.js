// @flow
import type { RadioKind } from './types'
import React, { PureComponent as Component } from 'react'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  kind: RadioKind,
}

class Radio extends Component<Props> {
  static defaultProps = {
    kind: 'default',
  }

  render() {
    const { className, kind, ...rest } = this.props

    const componentClassName = classNames('c-Radio', className)

    return (
      <Choice
        {...rest}
        className={componentClassName}
        componentID="Radio"
        kind={kind}
        type="radio"
      />
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Radio)

export default Radio
