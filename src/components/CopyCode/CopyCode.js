// @flow
import React, { PureComponent as Component } from 'react'
import CopyButton from '../CopyButton'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { CopyButtonUI, CopyCodeUI, WrapperUI } from './styles/CopyCode.css.js'

type Props = {
  children?: any,
  className?: string,
  language: string,
  onCopy: (event: Event) => void,
}

class CopyCode extends Component<Props> {
  static defaultProps = {}

  render() {
    const { className, children, onCopy, ...rest } = this.props
    const componentClassName = classNames('c-CopyCode', className)

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
      <WrapperUI className={componentClassName}>
        <CopyCodeUI
          {...getValidProps(rest)}
          contentEditable
          onCut={noop}
          onPaste={noop}
          onKeyDown={keyDown}
          spellCheck={false}
          suppressContentEditableWarning
        >
          {children}
        </CopyCodeUI>

        <CopyButtonUI kind="secondary" onCopy={onCopy}>
          Copy
        </CopyButtonUI>
      </WrapperUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CopyCode)

export default CopyCode
