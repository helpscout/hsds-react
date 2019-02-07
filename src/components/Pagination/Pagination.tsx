import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './Pagination.utils'
import { PaginationUI } from './Pagination.css.js'
import Text from '../Text'

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

  getCurrentPage() {
    const { activePage, rangePerPage, totalItems } = this.props
    if (activePage < 1) {
      return 1
    }
    const maxPage = Math.ceil(totalItems / rangePerPage)
    return Math.min(maxPage, Math.round(activePage))
  }

  getStartRange() {
    const { rangePerPage } = this.props
    const page = this.getCurrentPage()
    return page * rangePerPage - rangePerPage + 1
  }

  getEndRange() {
    const { rangePerPage, totalItems } = this.props
    const page = this.getCurrentPage()
    return Math.min(page * rangePerPage, totalItems)
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
