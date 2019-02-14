import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './Pagination.utils'
import pluralize from '../../utilities/pluralize'

import {
  PaginationUI,
  InformationUI,
  NavigationUI,
  RangeUI,
} from './Pagination.css.js'
import Text from '../Text'
import Icon from '../Icon'
import Button from '../Button'

export interface Props {
  activePage: number
  className?: string
  innerRef: (node: HTMLElement) => void
  onChange: (nextPageNumber: number) => void
  rangePerPage: number
  separator?: string
  showNavigation?: boolean
  pluralizeSubject?: string
  subject?: string
  totalItems: number
}

export class Pagination extends React.PureComponent<Props> {
  static defaultProps = {
    activePage: 1,
    innerRef: noop,
    onChange: noop,
    rangePerPage: 50,
    separator: 'of',
    showNavigation: true,
    totalItems: 0,
  }

  getNumberOfPages() {
    const { rangePerPage, totalItems } = this.props
    return Math.ceil(totalItems / rangePerPage)
  }

  getCurrentPage() {
    const { activePage } = this.props
    if (activePage < 1) {
      return 1
    }
    return Math.min(this.getNumberOfPages(), Math.round(activePage))
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

  getSubject() {
    const { totalItems, subject = '', pluralizeSubject } = this.props

    if (pluralizeSubject && totalItems > 1) {
      return pluralizeSubject
    }
    return pluralize(subject, totalItems)
  }

  isNavigationVisible() {
    const { showNavigation } = this.props
    return showNavigation && this.getNumberOfPages() > 1
  }

  handleStartClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(1)
  }

  handlePrevClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(this.getCurrentPage() - 1)
  }

  handleNextClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(this.getCurrentPage() + 1)
  }

  handleEndClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(this.getNumberOfPages())
  }

  renderRange() {
    return (
      <Text>
        <RangeUI>{this.getStartRange()}</RangeUI>
        {` `}-{` `}
        <RangeUI>{this.getEndRange()}</RangeUI>
      </Text>
    )
  }

  renderTotal() {
    const { totalItems, subject } = this.props
    return (
      <Text>
        {totalItems}
        {subject && ` ${this.getSubject()}`}
      </Text>
    )
  }

  renderNavigation() {
    const currentPage = this.getCurrentPage()
    const isNotFirstPage = currentPage > 1
    const isLastPage = currentPage >= this.getNumberOfPages()

    return (
      <NavigationUI>
        {isNotFirstPage && [
          <Button version={2} onClick={this.handleStartClick}>
            <Icon name="arrow-left-double-large" size="24" center />
          </Button>,
          <Button version={2} onClick={this.handlePrevClick}>
            <Icon name="arrow-left-single-large" size="24" center />
          </Button>,
        ]}

        <Button
          version={2}
          disabled={isLastPage}
          onClick={this.handleNextClick}
        >
          <Icon name="arrow-right-single-large" size="24" center />
        </Button>
        <Button version={2} disabled={isLastPage} onClick={this.handleEndClick}>
          <Icon name="arrow-right-double-large" size="24" center />
        </Button>
      </NavigationUI>
    )
  }

  render() {
    const {
      children,
      className,
      innerRef,
      onChange,
      separator,
      showNavigation,
      ...rest
    } = this.props

    const componentClassName = classNames('c-Pagination', className)

    return (
      <PaginationUI
        aria-label="Pagination"
        {...getValidProps(rest)}
        className={componentClassName}
        innerRef={innerRef}
      >
        <InformationUI>
          <Text size={13}>
            {this.renderRange()}
            {` `}
            {separator}
            {` `}
            {this.renderTotal()}
          </Text>
        </InformationUI>
        {this.isNavigationVisible() && this.renderNavigation()}
      </PaginationUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Pagination)
const PropConnectedComponent = propConnect(COMPONENT_KEY)(Pagination)

export default PropConnectedComponent
