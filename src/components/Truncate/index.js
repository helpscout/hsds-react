// @flow
import React, { PureComponent as Component } from 'react'
import EventListener from '../EventListener'
import Tooltip from '../Tooltip'
import classNames from '../../utilities/classNames'
import { truncateMiddle } from '../../utilities/strings'
import { truncateTypes } from './propTypes'

type Props = {
  children?: any,
  className?: string,
  ellipsis?: string,
  limit: number,
  end?: number,
  start?: number,
  showTooltipOnTruncate: boolean,
  title?: string,
  tooltipPlacement: string,
  type?: 'auto' | 'start' | 'middle' | 'end',
}

type State = {
  isTruncated: boolean,
}

class Truncate extends Component<Props, State> {
  static defaultProps = {
    children: '',
    ellipsis: '…',
    limit: 0,
    showTooltipOnTruncate: false,
    tooltipPlacement: 'top-start',
    type: 'auto',
  }
  node = null

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

  isTruncated = (props: Props) => {
    if (props.type !== 'auto') return true
    /* istanbul ignore next */
    if (!this.node) return false
    return this.node.offsetWidth < this.node.scrollWidth
  }

  render() {
    const {
      children,
      className,
      ellipsis,
      limit,
      showTooltipOnTruncate,
      tooltipPlacement,
      title,
      type,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Truncate',
      type && `is-${type}`,
      className
    )

    const shouldShowTooltip = showTooltipOnTruncate && this.state.isTruncated

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
        ? truncateMiddle(children, truncateStart, truncateEnd, ellipsis)
        : children

    const content = shouldShowTooltip ? (
      <Tooltip placement={tooltipPlacement} title={title || children}>
        {word}
      </Tooltip>
    ) : (
      word
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

export default Truncate
