import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { renderRenderPropComponent } from '../../utilities/component'
import { HeaderUI, HeadingUI } from './Popover.css'
import Text from '../Text'
import Tooltip, { Props as TooltipProps } from '../Tooltip/Tooltip'
import { isPlainContent } from './Popover.utils'

export interface Props extends TooltipProps {
  className?: string
  content?: any
  children?: any
  innerRef: (node: HTMLElement) => void
  header?: any
  renderHeader?: any
  renderContent?: any
}

export type PopperRenderProps = {
  close: () => void
  placement: string
}

export class Popover extends React.PureComponent<Props> {
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

  getRenderProps(renderProps: PopperRenderProps) {
    return {
      ...renderProps,
      Header: HeaderUI,
      Title: HeadingUI,
    }
  }

  renderPopoverContent = (renderProps: PopperRenderProps) => {
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

  renderPopoverHeader = (renderProps: PopperRenderProps) => {
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
        arrowSize={16}
        contentClassName="c-PopoverContent"
        className={this.getClassName()}
        closeOnMouseLeave={false}
        data-cy="Popover"
        dataCyPopper="PopoverContent"
        ref={innerRef}
        renderContent={this.renderContent}
      />
    )
  }
}

export default Popover
