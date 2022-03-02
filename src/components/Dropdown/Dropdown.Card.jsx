// Deprecated
/* istanbul ignore file */
import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import EventListener from '../EventListener'
import { connect } from '@helpscout/wedux'
import { CardUI } from './Dropdown.css'
import classNames from 'classnames'
import isNil from 'lodash.isnil'
import isNumber from 'lodash.isnumber'

function noop() {}

export class DropdownCard extends React.PureComponent {
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

  getWidthValue() {
    const { triggerNode, width } = this.props
    if (isNil(width)) return null
    if (isNumber(width)) return width

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
    const componentClassName = classNames(DropdownCard.className, className)

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

DropdownCard.defaultProps = {
  cardRef: noop,
  'data-cy': 'DropdownCard',
  style: {},
}

DropdownCard.propTypes = {
  borderColor: PropTypes.string,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.any,
  triggerNode: PropTypes.any,
  style: PropTypes.any,
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
)(DropdownCard)

export default ConnectedCard
