import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import hljs from 'highlight.js/lib/highlight'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Highlight.utils'
import { HighlightUI } from './styles/Highlight.css'

type Props = {
  children?: any
  className?: string
  language: string
}

class Highlight extends React.PureComponent<Props> {
  static defaultProps = {}

  highlightBlock = (node: HTMLElement) => {
    /* istanbul ignore next */
    node && hljs && hljs.highlightBlock(node)
  }

  render() {
    const { className, children, language, ...rest } = this.props
    const componentClassName = classNames('c-Highlight', className)

    return (
      <HighlightUI {...getValidProps(rest)} className={componentClassName}>
        <code className={language} ref={this.highlightBlock}>
          {children}
        </code>
      </HighlightUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Highlight)

export default Highlight
