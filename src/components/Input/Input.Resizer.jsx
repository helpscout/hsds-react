import React from 'react'
import PropTypes from 'prop-types'
import EventListener from '../EventListener'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { repeat } from '../../utilities/strings'
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

export class Resizer extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    contents: PropTypes.string,
    currentHeight: PropTypes.number,
    minimumLines: PropTypes.number,
    offsetAmount: PropTypes.number,
    onResize: PropTypes.func,
    seamless: PropTypes.bool,
  }

  static displayName = 'InputResizer'

  static defaultProps = {
    contents: '',
    currentHeight: null,
    minimumLines: 1,
    offsetAmount: 0,
    onResize: noop,
    seamless: false,
  }

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

    return classNames(Resizer.className, className)
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
    const charOffset = repeat(OFFSET_CHAR, this.props.offsetAmount)
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
    const { contents } = this.props

    return (
      <ResizerUI aria-hidden className={this.getClassName()}>
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

export default Resizer
