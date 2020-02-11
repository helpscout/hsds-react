import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { renderRenderPropComponent } from '../../utilities/component'
import { HeaderUI, HeadingUI } from './Popover.css'
import Text from '../Text'
import Tooltip from '../Tooltip/Tooltip'
import { isPlainContent } from './Popover.utils'

export class Popover extends React.PureComponent {
  static className = 'c-Popover'
  static defaultProps = {
    ...Tooltip.defaultProps,
    color: 'white',
    innerRef: noop,
  }

  getClassName() {
    const { className } = this.props
    return classNames(Popover.className, className)
  }

  getRenderProps(renderProps) {
    return {
      ...renderProps,
      Header: HeaderUI,
      Title: HeadingUI,
    }
  }

  renderPopoverContent = renderProps => {
    const { content, renderContent } = this.props

    if (renderContent) {
      return renderRenderPropComponent(
        renderContent,
        this.getRenderProps(renderProps)
      )
    }

    if (content) {
      if (isPlainContent(content)) {
        return <Text>{content}</Text>
      } else {
        return content
      }
    }
  }

  renderPopoverHeader = renderProps => {
    const { header, renderHeader } = this.props
    if (!header && !renderHeader) return null

    if (renderHeader) {
      return renderRenderPropComponent(
        renderHeader,
        this.getRenderProps(renderProps)
      )
    }

    /* istanbul ignore else */
    if (header) {
      let headerContent

      if (isPlainContent(header)) {
        headerContent = <HeadingUI>{header}</HeadingUI>
      } else {
        headerContent = header
      }

      return <HeaderUI>{headerContent}</HeaderUI>
    }
  }

  renderContent = renderProps => {
    const { close, placement } = renderProps
    return (
      <div className="c-PopoverContentBody">
        {this.renderPopoverHeader({ close, placement })}
        {this.renderPopoverContent({ close, placement })}
      </div>
    )
  }

  render() {
    const { innerRef, ...rest } = this.props

    return (
      <Tooltip
        {...rest}
        arrowClassName="c-PopoverArrow"
        arrowSize={12}
        contentClassName="c-PopoverContent"
        className={this.getClassName()}
        closeOnMouseLeave={false}
        data-cy="Popover"
        dataCyPopper="PopoverContent"
        innerRef={innerRef}
        renderContent={this.renderContent}
      />
    )
  }
}

Popover.propTypes = Object.assign(Tooltip.propTypes, {
  className: PropTypes.string,
  content: PropTypes.any,
  children: PropTypes.any,
  innerRef: PropTypes.func,
  header: PropTypes.any,
  renderHeader: PropTypes.any,
  renderContent: PropTypes.any,
})

export default Popover
