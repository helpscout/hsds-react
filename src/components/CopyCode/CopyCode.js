// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Highlight from '../Highlight'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { selectText } from '../../utilities/select'
import copy from 'copy-to-clipboard'
import { COMPONENT_KEY } from './utils'
import { CopyButtonUI, CopyCodeUI, WrapperUI } from './styles/CopyCode.css.js'

type Props = {
  className?: string,
  code: string,
  language?: string,
}

class CopyCode extends Component<Props> {
  static defaultProps = {}

  componentDidMount() {
    this.codeNode && selectText(this.codeNode)
  }

  handleCopyClick() {
    this.codeNode && selectText(this.codeNode)
    copy(this.props.code)
  }

  render() {
    const { className, code, language, ...rest } = this.props
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

    const codeComponent = language ? (
      <Highlight language={language}>{code}</Highlight>
    ) : (
      <pre>
        <code>{code}</code>
      </pre>
    )

    return (
      <WrapperUI className={componentClassName}>
        <CopyCodeUI
          {...getValidProps(rest)}
          contentEditable
          onCut={noop}
          onPaste={noop}
          onKeyDown={keyDown}
          innerRef={codeNode => (this.codeNode = codeNode)}
          spellCheck={false}
          suppressContentEditableWarning
        >
          {codeComponent}
        </CopyCodeUI>

        <CopyButtonUI
          kind="secondary"
          onClick={this.handleCopyClick.bind(this)}
        >
          Copy
        </CopyButtonUI>
      </WrapperUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(CopyCode)

export default CopyCode
