// @flow
// See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/Resizer.tsx
import React, { PureComponent as Component } from 'react'
import EventListener from '../EventListener'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { repeat } from '../../utilities/strings'

// Thanks Stephen <3
export const OFFSET_CHAR = 'R'

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
}
const REPLACE_REGEX = /[\n&<>]/g

type Props = {
  className?: string,
  contents: string,
  currentHeight: ?number,
  minimumLines: number,
  offsetAmount: number,
  onResize: (size: number) => void,
  seamless: boolean,
}

type RefNode = HTMLDivElement | null

class Resizer extends Component<Props> {
  static defaultProps = {
    contents: '',
    currentHeight: null,
    minimumLines: 1,
    offsetAmount: 0,
    onResize: noop,
    seamless: false,
  }
  contentNode: RefNode
  minimumLinesNode: RefNode

  componentDidMount() {
    this.handleOnResize()
  }

  componentDidUpdate() {
    this.handleOnResize()
  }

  // Ignoring as height calculation isn't possible with JSDOM
  // (which is what Enzyme uses for tests)
  /* istanbul ignore next */
  handleOnResize = () => {
    if (!this.contentNode || !this.minimumLinesNode) return
    const contentHeight = this.contentNode.offsetHeight
    const minimumHeight = this.minimumLinesNode
      ? this.minimumLinesNode.offsetHeight
      : /* istanbul ignore next */ 0
    const newHeight = Math.max(contentHeight, minimumHeight)

    const { currentHeight, onResize } = this.props

    if (newHeight !== currentHeight) {
      onResize(newHeight)
    }
  }

  replaceEntity(entity: string): string {
    return ENTITIES_TO_REPLACE[entity] || /* istanbul ignore next */ entity
  }

  getContentsForMinimumLines(minimumLines: number): string {
    let content = ''
    for (let line = 0; line < minimumLines; line++) {
      content += '<br>'
    }

    return content
  }

  getFinalContents(contents: string): string {
    const charOffset = repeat(OFFSET_CHAR, this.props.offsetAmount)
    return contents
      ? `${contents
          .replace(REPLACE_REGEX, this.replaceEntity)
          .concat(charOffset)}<br>`
      : '<br>'
  }

  render() {
    const { className, contents, minimumLines, seamless } = this.props
    const handleOnResize = this.handleOnResize

    const componentClassName = classNames('c-InputResizer', className)

    const minimumLinesMarkup = minimumLines ? (
      <div
        ref={(node: RefNode) => (this.minimumLinesNode = node)}
        className={classNames(
          'c-InputGhost',
          'c-InputGhost--lineBreak',
          seamless && 'is-seamless'
        )}
        dangerouslySetInnerHTML={{
          __html: this.getContentsForMinimumLines(minimumLines),
        }}
      />
    ) : null

    return (
      <div aria-hidden className={componentClassName}>
        <EventListener event="resize" handler={handleOnResize} />
        <div
          ref={(node: RefNode) => (this.contentNode = node)}
          className={classNames(
            'c-InputGhost',
            'c-InputGhost--characters',
            seamless && 'is-seamless'
          )}
          dangerouslySetInnerHTML={{ __html: this.getFinalContents(contents) }}
        />
        {minimumLinesMarkup}
      </div>
    )
  }
}

export default Resizer
