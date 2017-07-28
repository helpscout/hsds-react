// See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/Resizer.tsx

import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/constants'

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>'
}
const REPLACE_REGEX = /[\n&<>]/g

const propTypes = {
  contents: PropTypes.string,
  currentHeight: PropTypes.number,
  minimumLines: PropTypes.number,
  onResize: PropTypes.func
}
const defaultProps = {
  contents: '',
  currentHeight: null,
  minimumLines: 1,
  onResize: noop
}

class Resizer extends Component {
  componentDidMount () {
    this.handleOnResize()
  }

  componentDidUpdate () {
    this.handleOnResize()
  }

  // Ignoring as height calculation isn't possible with JSDOM
  // (which is what Enzyme uses for tests)
  /* istanbul ignore next */
  handleOnResize () {
    const contentHeight = this.contentNode.offsetHeight
    const minimumHeight = this.minimumLinesNode
      ? this.minimumLinesNode.offsetHeight
      : 0
    const newHeight = Math.max(contentHeight, minimumHeight)

    const { currentHeight, onResize } = this.props

    if (newHeight !== currentHeight) {
      onResize(newHeight)
    }
  }

  replaceEntity (entity) {
    return ENTITIES_TO_REPLACE[entity] || /* istanbul ignore next */ entity
  }

  getContentsForMinimumLines (minimumLines) {
    let content = ''
    for (let line = 0; line < minimumLines; line++) {
      content += '<br>'
    }

    return content
  }

  getFinalContents (contents) {
    return contents
      ? `${contents.replace(REPLACE_REGEX, this.replaceEntity)}<br>`
      : '<br>'
  }

  render () {
    const { contents, minimumLines } = this.props

    const minimumLinesMarkup = minimumLines
      ? <div
        ref={node => (this.minimumLinesNode = node)}
        className='c-InputGhost'
        dangerouslySetInnerHTML={{
          __html: this.getContentsForMinimumLines(minimumLines)
        }}
        />
      : null

    return (
      <div aria-hidden className='c-InputResizer'>
        <div
          ref={node => (this.contentNode = node)}
          className='c-InputGhost'
          dangerouslySetInnerHTML={{ __html: this.getFinalContents(contents) }}
        />
        {minimumLinesMarkup}
      </div>
    )
  }
}

Resizer.propTypes = propTypes
Resizer.defaultProps = defaultProps

export default Resizer
