import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './Pagination.utils'
import { PaginationUI } from './Pagination.css.js'
import Text from 'components/Text/Text'

export interface Props {
  className?: string
  onChange: (event: Event) => void
  innerRef: (node: HTMLElement) => void
  showNavigation?: boolean
  activePage: number
  totalItems: number
  rangePerPage: number
  subject?: string
  separator?: string
}

export class Pagination extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    onChange: noop,
    showNavigation: true,
    activePage: 1,
    rangePerPage: 50,
    separator: 'of',
    totalItems: 0,
  }

  getStartRange() {
    const { rangePerPage, activePage } = this.props
    return activePage * rangePerPage - activePage + 1
  }

  getEndRange() {
    const { rangePerPage, activePage, totalItems } = this.props
    return Math.min(activePage * rangePerPage, totalItems)
  }

  renderRange() {
    return (
      <Text>
        {this.getStartRange()}
        {` `}-{` `}
        {this.getEndRange()}
      </Text>
    )
  }

  renderTotal() {
    const { totalItems, subject } = this.props
    return (
      <Text>
        {totalItems}
        {subject && ` ${subject}`}
      </Text>
    )
  }

  renderNavigation() {}

  render() {
    const {
      children,
      className,
      innerRef,
      separator,
      showNavigation,
      onChange,
      ...rest
    } = this.props

    const componentClassName = classNames('c-Pagination', className)

    return (
      <PaginationUI
        aria-label="Close"
        {...getValidProps(rest)}
        className={componentClassName}
        innerRef={innerRef}
      >
        {this.renderRange()}
        <Text>
          {` `}
          {separator}
          {` `}
        </Text>
        {this.renderTotal()}
        {showNavigation && this.renderNavigation()}
      </PaginationUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Pagination)
const PropConnectedComponent = propConnect(COMPONENT_KEY)(Pagination)

export default PropConnectedComponent
