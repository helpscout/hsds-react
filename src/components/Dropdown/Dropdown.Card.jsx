import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import EventListener from '../EventListener'
import { connect } from '@helpscout/wedux'
import { CardUI } from './Dropdown.css'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { isDefined, isNumber } from '../../utilities/is'

export class Card extends React.PureComponent {
  static displayName = 'DropdownCard'

  static propTypes = {
    borderColor: PropTypes.string,
    className: PropTypes.string,
    innerRef: PropTypes.func,
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.any,
    triggerNode: PropTypes.node,
    style: PropTypes.any,
  }

  static defaultProps = {
    cardRef: noop,
    style: {},
  }

  static className = 'c-DropdownCard'

  state = {
    width: this.props.width,
  }

  componentDidMount() {
    this.updateWidth()
  }

  updateWidth = () => {
    this.setState({
      width: this.getWidthValue(),
    })
  }

  /* istanbul ignore next */
  getWidthValue() {
    const { triggerNode, width } = this.props
    if (!isDefined(width)) return null
    if (isNumber(width)) return width

    // @ts-ignore
    if (!width.includes('%') || !triggerNode) return width

    return triggerNode.clientWidth * (parseInt(width, 10) / 100)
  }

  getStyles() {
    const {
      borderColor,
      minWidth,
      minHeight,
      maxHeight,
      maxWidth,
      style,
    } = this.props

    return {
      ...style,
      borderColor,
      minWidth,
      minHeight,
      maxHeight,
      maxWidth,
      width: this.state.width,
    }
  }

  render() {
    const { className, children, cardRef, ...rest } = this.props

    const componentClassName = classNames(Card.className, className)

    return (
      <CardUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={cardRef}
        style={this.getStyles()}
      >
        <EventListener event="resize" handler={this.updateWidth} />
        {children}
      </CardUI>
    )
  }
}

const ConnectedCard = connect(
  // mapStateToProps
  state => {
    const {
      cardBorderColor,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      triggerNode,
      width,
    } = state

    return {
      borderColor: cardBorderColor,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      triggerNode,
      width,
    }
  }
)(Card)

export default ConnectedCard
