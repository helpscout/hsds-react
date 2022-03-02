import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import EventListener from '../EventListener'
import Tooltip from '../Tooltip'
import { TruncateUI, TruncateWithSplitterUI } from './Truncate.css'
import { TRUNCATED_CLASSNAMES, truncateMiddle } from './Truncate.utils'

export class Truncate extends React.PureComponent {
  node = null
  contentNode = null
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isTruncated: !!props.type,
    }
  }

  componentDidMount() {
    this._isMounted = true

    // The timeout is necessary to ensure the `isTruncated` calculation
    // happens after the content has been rendered to the page. The
    // _isMounted guard is necessary because sometimes the callback
    // will run after the component has been unmounted, which results
    // in a warning.
    setTimeout(() => {
      if (this.props.type === 'auto' && this._isMounted) {
        this.setState({
          isTruncated: this.isTruncated(this.props),
        })
      }
    }, 0)
  }

  componentWillUnmount() {
    this.node = null
    this.contentNode = null
    this._isMounted = false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type) {
      this.setState({
        isTruncated: this.isTruncated(nextProps),
      })
    }
  }

  handleOnResize = () => {
    if (!this.props.showTooltipOnTruncate) return

    const isTruncated = this.isTruncated(this.props)
    if (isTruncated === this.state.isTruncated) return

    this.setState({ isTruncated })
  }

  isTruncated = (props = this.props) => {
    if (props.type !== 'auto') {
      return this.getText(props) !== this.getTruncatedContent(props)
    } else {
      if (!this.node || !this.contentNode) return false

      const isContentTruncated = props.splitter
        ? this.isSplitContentTruncated(this.contentNode, this.node)
        : this.contentNode.scrollWidth > this.node.offsetWidth

      return isContentTruncated
    }
  }

  isSplitContentTruncated = (contentNode, node) => {
    return (
      contentNode.offsetWidth <
      node.querySelector(`.${TRUNCATED_CLASSNAMES.firstChunk}`).scrollWidth +
        node.querySelector(`.${TRUNCATED_CLASSNAMES.secondChunk}`).scrollWidth
    )
  }

  getText = (props = this.props) => {
    return this.props.text || this.props.children
  }

  getTruncatedContent = (props = this.props) => {
    return getTruncatedContent({ ...props, text: this.getText(props) })
  }

  render() {
    const {
      children,
      className,
      ellipsis,
      limit,
      showTooltipOnTruncate,
      splitter,
      tooltipPlacement,
      tooltipProps,
      tooltipModifiers,
      title,
      text,
      type,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Truncate',
      type && `is-${type}`,
      className
    )

    const shouldShowTooltip = showTooltipOnTruncate && this.state.isTruncated
    let truncatedText

    if (splitter) {
      const str = text || children
      const [first, second] = str.split(splitter)

      truncatedText = (
        <TruncateWithSplitterUI
          className={`${TRUNCATED_CLASSNAMES.component} ${TRUNCATED_CLASSNAMES.withSplitter}`}
        >
          <span className={`${TRUNCATED_CLASSNAMES.firstChunk}`}>{first}</span>
          <span className={`${TRUNCATED_CLASSNAMES.secondChunk}`}>
            {splitter}
            {second}
          </span>
        </TruncateWithSplitterUI>
      )
    } else {
      truncatedText = this.getTruncatedContent()
    }

    const textMarkup = (
      <span
        className="c-Truncate__content"
        ref={ref => (this.contentNode = ref)}
      >
        {truncatedText}
      </span>
    )
    const content = shouldShowTooltip ? (
      <Tooltip
        closeOnContentClick={true}
        {...tooltipProps}
        placement={tooltipPlacement}
        title={title || this.getText()}
      >
        {textMarkup}
      </Tooltip>
    ) : (
      textMarkup
    )

    return (
      <TruncateUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={ref => (this.node = ref)}
      >
        <EventListener event="resize" handler={this.handleOnResize} />
        {content}
      </TruncateUI>
    )
  }
}

/**
 * Generates the truncated content based on props.
 *
 * @param   {Object} props Component props.
 * @returns {string} The truncated content.
 */
export function getTruncatedContent(props) {
  const { ellipsis, limit, type, text } = props

  let truncateStart
  let truncateEnd

  switch (type) {
    case 'start':
      truncateStart = 0
      truncateEnd = limit
      break
    case 'middle':
      truncateStart = Math.floor(limit / 2)
      truncateEnd = Math.floor(limit / 2)
      break
    default:
      truncateStart = limit
      truncateEnd = 0
  }

  const word =
    type !== 'auto'
      ? truncateMiddle(text, truncateStart, truncateEnd, ellipsis)
      : text

  return word
}

Truncate.defaultProps = {
  'data-cy': 'Truncate',
  ellipsis: '…',
  limit: 0,
  showTooltipOnTruncate: false,
  tooltipModifiers: {},
  tooltipPlacement: 'top-start',
  tooltipProps: {},
  type: 'auto',
}

Truncate.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Characters to show during truncation. */
  ellipsis: PropTypes.string,
  /** The amount of characters to keep before truncation. */
  limit: PropTypes.number,
  /** Renders a [Tooltip](../Tooltip) if content is truncated. Default `false`. */
  showTooltipOnTruncate: PropTypes.bool,
  /** Char to split string on for truncating mid-string, `longEma...@email.com`. */
  splitter: PropTypes.string,
  /** Location of truncation.
   * `auto`    Uses CSS truncation. This is the default.
   * `start`   Truncates beginning of string.
   * `middle`  Truncates middle of string.
   * `end`     Truncates end of string.
   */
  type: PropTypes.oneOf(['auto', 'start', 'middle', 'end']),
  end: PropTypes.number,
  start: PropTypes.number,
  text: PropTypes.string,
  title: PropTypes.string,
  tooltipProps: PropTypes.object,
  tooltipPlacement: PropTypes.string,
  tooltipModifiers: PropTypes.object,
}

export default Truncate
