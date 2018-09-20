// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { CopyInputUI } from './styles/CopyInput.css.js'

type Props = {
  children?: any,
  className?: string,
}

class CopyInput extends Component<Props> {
  static defaultProps = {}

  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-CopyInput', className)

    const noop = e => {
      e.preventDefault()
      return false
    }

    const keyDown = e => {
      if (e.ctrlKey || e.metaKey) {
        return true
      }

      return noop(e)
    }

    return (
      <CopyInputUI
        {...getValidProps(rest)}
        className={componentClassName}
        contentEditable
        onCut={noop}
        onPaste={noop}
        onKeyDown={keyDown}
      >
        {children}
      </CopyInputUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CopyInput)

export default CopyInput
