import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import classNames from 'classnames'
import { ResizerUI, GhostUI } from './Input.Resizer.css'

// Thanks Stephen <3
export const OFFSET_CHAR = 'R'

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
}
const REPLACE_REGEX = /[\n&<>]/g

export class InputResizer extends React.PureComponent {
  static className = 'c-InputResizer'

  contentNode
  minimumLinesNode
  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    this.handleOnResize()

    // Re-trigger to help recalculate when used within heavier components/views.

    requestAnimationFrame(() => {
      if (this._isMounted) {
        this.handleOnResize()
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidUpdate() {
    this.handleOnResize()
  }

  getClassName() {
    const { className } = this.props

    return classNames(InputResizer.className, className)
  }

  getContentClassName() {
    const { seamless } = this.props

    return classNames(
      'c-InputGhost',
      'c-InputGhost--characters',
      seamless && 'is-seamless'
    )
  }

  // Ignoring as height calculation isn't possible with JSDOM
  // (which is what Enzyme uses for tests)

  handleOnResize = () => {
    if (!this.contentNode || !this.minimumLinesNode) return
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

  replaceEntity(entity) {
    return ENTITIES_TO_REPLACE[entity] || entity
  }

  getContentsForMinimumLines(minimumLines) {
    let content = ''
    for (let line = 0; line < minimumLines; line++) {
      content += '<br>'
    }

    return content
  }

  getFinalContents(contents) {
    const charOffset = OFFSET_CHAR.repeat(this.props.offsetAmount)
    return contents
      ? `${contents
          .replace(REPLACE_REGEX, this.replaceEntity)
          .concat(charOffset)}<br>`
      : '<br>'
  }

  setMinimumLinesNode = node => (this.minimumLinesNode = node)
  setContentNodeRef = node => (this.contentNode = node)

  renderMinimumLines() {
    const { minimumLines } = this.props
    if (!minimumLines) return

    return (
      <GhostUI
        ref={this.setMinimumLinesNode}
        className={this.getContentClassName()}
        dangerouslySetInnerHTML={{
          __html: this.getContentsForMinimumLines(minimumLines),
        }}
      />
    )
  }

  render() {
    const { contents, ...rest } = this.props

    return (
      <ResizerUI
        {...getValidProps(rest)}
        aria-hidden
        className={this.getClassName()}
      >
        <EventListener event="resize" handler={this.handleOnResize} />
        <GhostUI
          ref={this.setContentNodeRef}
          className={this.getContentClassName()}
          dangerouslySetInnerHTML={{ __html: this.getFinalContents(contents) }}
        />
        {this.renderMinimumLines()}
      </ResizerUI>
    )
  }
}

function noop() {}

InputResizer.defaultProps = {
  contents: '',
  currentHeight: null,
  'data-cy': 'InputResizer',
  minimumLines: 1,
  offsetAmount: 0,
  onResize: noop,
  seamless: false,
}

InputResizer.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  contents: PropTypes.string,
  currentHeight: PropTypes.number,
  minimumLines: PropTypes.number,
  /** Number of characters to offset (bottom-right) for multiline resizing. */
  offsetAmount: PropTypes.number,
  /** Callback when input is resized. */
  onResize: PropTypes.func,
  /** Removes the border around the input. */
  seamless: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default InputResizer
