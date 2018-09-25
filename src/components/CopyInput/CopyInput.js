// @flow
import React, { PureComponent as Component } from 'react'
import ControlGroup from '../ControlGroup'
import CopyButton from '../CopyButton'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { selectText } from '../../utilities/select'
import { CopyInputUI } from './styles/CopyInput.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  onCopy: (string: value) => undefined,
  readOnly?: boolean,
  value: string,
}

class CopyInput extends Component<Props> {
  static defaultProps = {}

  handleCopyClick() {
    const { onCopy, value } = this.props

    // Select the text in the input
    this.input && selectText(this.input)

    onCopy(value)
  }

  render() {
    const { className, ...rest } = this.props
    const componentClassName = classNames('c-CopyInput', className)

    return (
      <ControlGroup className={componentClassName}>
        <ControlGroup.Block>
          <CopyInputUI
            {...getValidProps(rest)}
            inputRef={input => (this.input = input)}
          />
        </ControlGroup.Block>
        <ControlGroup.Item>
          <CopyButton onClick={this.handleCopyClick.bind(this)} size="lg" />
        </ControlGroup.Item>
      </ControlGroup>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CopyInput)

export default CopyInput
