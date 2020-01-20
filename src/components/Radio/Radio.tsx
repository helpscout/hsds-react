import * as React from 'react'
import { RadioKind } from './Radio.types'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'

type Props = {
  className?: string
  kind: RadioKind
}

class Radio extends React.PureComponent<Props> {
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

export default Radio
