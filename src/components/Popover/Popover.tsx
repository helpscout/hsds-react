import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { renderRenderPropComponent } from '../../utilities/component'
import { PopoverUI, HeaderUI, HeadingUI } from './Popover.css'
import { COMPONENT_KEY, isPlainContent } from './Popover.utils'
import Text from '../Text'
import Tooltip, { Props as TooltipProps } from '../Tooltip/Tooltip'

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

    let headerContent

    if (renderHeader) {
      return renderRenderPropComponent(
        renderHeader,
        this.getRenderProps(renderProps)
      )
    }

    if (header) {
      if (isPlainContent(header)) {
        headerContent = <HeadingUI>{header}</HeadingUI>
      } else {
        headerContent = header
      }

      return <HeaderUI>{headerContent}</HeaderUI>
    }

    return null
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
      <PopoverUI
        {...rest}
        arrowClassName="c-PopoverArrow"
        arrowSize={12}
        contentClassName="c-PopoverContent"
        className={this.getClassName()}
        closeOnMouseLeave={false}
        innerRef={innerRef}
        renderContent={this.renderContent}
      />
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Popover)

export default PropConnectedComponent
