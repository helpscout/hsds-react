// @flow
import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import Radio from '../Radio'
import { RadioCardUI } from './styles/RadioCard.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
}

class RadioCard extends Component<Props> {
  render() {
    const { ...rest } = this.props

    return (
      <RadioCardUI>
        <Radio {...rest} kind="custom" />
      </RadioCardUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(RadioCard)

export default RadioCard
