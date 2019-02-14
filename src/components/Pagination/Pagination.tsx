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
  ButtonIconUI,
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
  subject: string
  totalItems: number
}

export class Pagination extends React.PureComponent<Props> {
  static defaultProps = {
    activePage: 1,
    innerRef: noop,
    onChange: noop,
    rangePerPage: 50,
    separator: 'of',
    subject: '',
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
    const { totalItems, subject, pluralizeSubject } = this.props

    if (totalItems === 0) return subject
    if (pluralizeSubject && totalItems > 1) return pluralizeSubject

    return pluralize(subject, totalItems)
  }

  isNavigationVisible() {
    const { showNavigation } = this.props
    return showNavigation && this.getNumberOfPages() > 1
  }

  handleFirstClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(1)
  }

  handlePrevClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    const currentPage = this.getCurrentPage()
    if (currentPage > 1) {
      onChange && onChange(currentPage - 1)
    }
  }

  handleNextClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    const currentPage = this.getCurrentPage()
    if (currentPage < this.getNumberOfPages()) {
      onChange && onChange(this.getCurrentPage() + 1)
    }
  }

  handleEndClick = e => {
    e.preventDefault()
    const { onChange } = this.props
    onChange && onChange(this.getNumberOfPages())
  }

  renderRange() {
    return (
      <Text className="c-Pagination__range">
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
        <span className="c-Pagination__total">{totalItems}</span>
        {subject && (
          <span className="c-Pagination__subject">{` ${this.getSubject()}`}</span>
        )}
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
          <ButtonIconUI
            key="firstButton"
            version={2}
            onClick={this.handleFirstClick}
            className="c-Pagination__firstButton"
          >
            <Icon name="arrow-left-double-large" size="24" center />
          </ButtonIconUI>,
          <ButtonIconUI
            key="prevButton"
            version={2}
            onClick={this.handlePrevClick}
            className="c-Pagination__prevButton"
          >
            <Icon name="arrow-left-single-large" size="24" center />
          </ButtonIconUI>,
        ]}

        <ButtonIconUI
          version={2}
          disabled={isLastPage}
          onClick={this.handleNextClick}
          className="c-Pagination__nextButton"
        >
          <Icon name="arrow-right-single-large" size="24" center />
        </ButtonIconUI>
        <ButtonIconUI
          version={2}
          disabled={isLastPage}
          onClick={this.handleEndClick}
          className="c-Pagination__lastButton"
        >
          <Icon name="arrow-right-double-large" size="24" center />
        </ButtonIconUI>
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
