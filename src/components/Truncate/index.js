// @flow
import React, { PureComponent as Component } from 'react'
import EventListener from '../EventListener'
import Tooltip from '../Tooltip'
import classNames from '../../utilities/classNames'
import styled from '../styled'
import { truncateMiddle } from '../../utilities/strings'
import css from './styles/Truncate.css.js'

type Props = {
  children?: any,
  className?: string,
  ellipsis?: string,
  limit: number,
  end?: number,
  start?: number,
  showTooltipOnTruncate: boolean,
  text?: string,
  title?: string,
  tooltipProps: Object,
  tooltipPlacement: string,
  tooltipModifiers: Object,
  type?: 'auto' | 'start' | 'middle' | 'end',
}

type State = {
  isTruncated: boolean,
}

export class BaseComponent extends Component<Props, State> {
  static displayName = 'Truncate'
  static defaultProps = {
    ellipsis: '…',
    limit: 0,
    showTooltipOnTruncate: false,
    tooltipModifiers: {},
    tooltipPlacement: 'top-start',
    tooltipProps: {},
    type: 'auto',
  }
  node: ?HTMLSpanElement = null
  contentNode: ?HTMLSpanElement = null

  constructor(props: Props) {
    super(props)
    this.state = {
      isTruncated: !!props.type,
    }
  }

  componentDidMount() {
    if (this.props.type === 'auto') {
      this.setState({
        isTruncated: this.isTruncated(this.props),
      })
    }
  }

  componentWillUnmount() {
    this.node = null
    this.contentNode = null
  }

  componentWillReceiveProps(nextProps: Props) {
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

  isTruncated = (props: Props = this.props): boolean => {
    if (props.type !== 'auto') {
      return this.getText(props) !== this.getTruncatedContent(props)
    } else {
      /* istanbul ignore next */
      if (!this.node || !this.contentNode) return false

      // 1. Normalizes the display to allow for calculation
      this.contentNode.style.display = 'initial'
      // 2. Calculate the differences
      const isContentTruncated =
        this.contentNode.offsetWidth > this.node.offsetWidth
      // 3. Resets the display
      // $FlowFixMe
      this.contentNode.style.display = null

      return isContentTruncated
    }
  }

  getText = (props: Props = this.props) => {
    return this.props.text || this.props.children
  }

  getTruncatedContent = (props: Props = this.props) => {
    return getTruncatedContent({ ...props, text: this.getText(props) })
  }

  render() {
    const {
      children,
      className,
      ellipsis,
      limit,
      showTooltipOnTruncate,
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
    const word = this.getTruncatedContent()

    const wordMarkup = (
      <span
        className="c-Truncate__content"
        ref={ref => (this.contentNode = ref)}
      >
        {word}
      </span>
    )
    const content = shouldShowTooltip ? (
      <Tooltip
        {...tooltipProps}
        display="block"
        placement={tooltipPlacement}
        title={title || this.getText()}
      >
        {wordMarkup}
      </Tooltip>
    ) : (
      wordMarkup
    )

    return (
      <span
        className={componentClassName}
        ref={ref => (this.node = ref)}
        {...rest}
      >
        <EventListener event="resize" handler={this.handleOnResize} />
        {content}
      </span>
    )
  }
}

/**
 * Generates the truncated content based on props.
 *
 * @param   {Object} props Component props.
 * @returns {string} The truncated content.
 */
export function getTruncatedContent(props: Object): string {
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

export default styled(BaseComponent)(css)
