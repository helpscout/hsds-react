// @flow
import React, { PureComponent as Component } from 'react'
import ControlGroup from '../ControlGroup'
import CopyButton from '../CopyButton'
import Input from '../Input'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
  onCopy: (string: value) => void,
  readOnly?: boolean,
  value: string,
}

class CopyInput extends Component<Props> {
  static defaultProps = {}

  handleCopyClick() {
    this.props.onCopy(this.input.value)
  }

  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-CopyInput', className)

    return (
      <ControlGroup className={componentClassName}>
        <ControlGroup.Block>
          <Input
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
