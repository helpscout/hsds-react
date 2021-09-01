import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import pluralize from '../../utilities/pluralize'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import { formatNumber } from '../../utilities/number'
import {
  PaginationUI,
  InformationUI,
  NavigationUI,
  RangeUI,
  ButtonIconUI,
} from './Pagination.css.js'
import Text from '../Text'
import Icon from '../Icon'

export class Pagination extends React.PureComponent {
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
    return Math.max(page * rangePerPage - rangePerPage + 1, 0)
  }

  getEndRange() {
    const { rangePerPage, totalItems } = this.props
    const page = this.getCurrentPage()
    return Math.min(page * rangePerPage, totalItems)
  }

  getSubject() {
    const { subject, pluralizedSubject } = this.props
    const totalItems = this.getTotalItems()

    if (totalItems === 0) return subject
    if (pluralizedSubject && totalItems > 1) return pluralizedSubject

    return pluralize(subject, totalItems)
  }

  getTotalItems() {
    const { totalItems } = this.props
    return Math.max(totalItems, 0)
  }

  shouldShowNavigation() {
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
    const { separator, subject } = this.props
    const totalItems = this.getTotalItems()
    const totalNode = (
      <span className="c-Pagination__total" data-cy="Pagination-totalItems">
        {formatNumber(totalItems)}
      </span>
    )

    if (!totalItems || !this.shouldShowNavigation()) {
      return subject ? <RangeUI>{totalNode}</RangeUI> : null
    }

    return (
      <Text className="c-Pagination__range">
        <RangeUI data-cy="Pagination-startRange">
          {formatNumber(this.getStartRange())}
        </RangeUI>
        {` `}-{` `}
        <RangeUI data-cy="Pagination-endRange">
          {formatNumber(this.getEndRange())}
        </RangeUI>
        {` `}
        {separator}
        {` `}
        {totalNode}
      </Text>
    )
  }

  renderNavigation() {
    const { isLoading } = this.props
    const currentPage = this.getCurrentPage()
    const isNotFirstPage = currentPage > 1
    const isLastPage = currentPage >= this.getNumberOfPages()

    return (
      <NavigationUI>
        <KeypressListener
          keyCode={Keys.KEY_J}
          handler={this.handlePrevClick}
          noModifier
          type="keyup"
        />
        <KeypressListener
          keyCode={Keys.KEY_K}
          handler={this.handleNextClick}
          noModifier
          type="keyup"
        />
        {isNotFirstPage && [
          <ButtonIconUI
            key="firstButton"
            onClick={this.handleFirstClick}
            className="c-Pagination__firstButton"
            disabled={isLoading}
            title="First page"
            data-cy="Pagination-firstButton"
          >
            <Icon name="arrow-left-double-large" size="24" center />
          </ButtonIconUI>,
          <ButtonIconUI
            key="prevButton"
            onClick={this.handlePrevClick}
            className="c-Pagination__prevButton"
            disabled={isLoading}
            title="Previous page (j)"
            data-cy="Pagination-prevButton"
          >
            <Icon name="arrow-left-single-large" size="24" center />
          </ButtonIconUI>,
        ]}
        {!isLastPage && [
          <ButtonIconUI
            key="nextButton"
            disabled={isLoading}
            onClick={this.handleNextClick}
            className="c-Pagination__nextButton"
            title="Next page (k)"
            data-cy="Pagination-nextButton"
          >
            <Icon name="arrow-right-single-large" size="24" center />
          </ButtonIconUI>,
          <ButtonIconUI
            key="lastButton"
            disabled={isLoading}
            onClick={this.handleEndClick}
            className="c-Pagination__lastButton"
            title="Last page"
            data-cy="Pagination-lastButton"
          >
            <Icon name="arrow-right-double-large" size="24" center />
          </ButtonIconUI>,
        ]}
      </NavigationUI>
    )
  }

  render() {
    const {
      children,
      className,
      innerRef,
      onChange,
      renderCustomContent,
      separator,
      showNavigation,
      subject,
      ...rest
    } = this.props

    const componentClassName = classNames('c-Pagination', className)

    return (
      <PaginationUI
        {...getValidProps(rest)}
        aria-label="Pagination"
        className={componentClassName}
        ref={innerRef}
      >
        {renderCustomContent ? (
          renderCustomContent({
            currentPage: this.getCurrentPage(),
            endRange: formatNumber(this.getEndRange()),
            numberOfPages: this.getNumberOfPages(),
            startRange: formatNumber(this.getStartRange()),
            pluralizedSubject: this.getSubject(),
          })
        ) : (
          <InformationUI>
            <Text size={13}>
              {this.renderRange()}
              {subject && (
                <span className="c-Pagination__subject">{` ${this.getSubject()}`}</span>
              )}
            </Text>
          </InformationUI>
        )}
        {this.shouldShowNavigation() && this.renderNavigation()}
      </PaginationUI>
    )
  }
}

Pagination.defaultProps = {
  activePage: 1,
  'data-cy': 'Pagination',
  innerRef: noop,
  isLoading: false,
  onChange: noop,
  rangePerPage: 50,
  separator: 'of',
  showNavigation: true,
  subject: '',
  totalItems: 0,
}

Pagination.propTypes = {
  innerRef: PropTypes.func,
  /** Current selected page */
  activePage: PropTypes.number,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disables the navigation while `true` */
  isLoading: PropTypes.bool,
  /** Callback when current page is changed. */
  onChange: PropTypes.func,
  /** Pluralize subject. If empty subject will be automaticaly pluralize */
  pluralizedSubject: PropTypes.string,
  /** Render prop that allows you to render your own custom content, gives you access to `{starRange, endRange, numberOfPages, currentPage, pluralizedSubject}` */
  renderCustomContent: PropTypes.func,
  /** Number of items per page */
  rangePerPage: PropTypes.number,
  /** Add a navigation to the component */
  showNavigation: PropTypes.bool,
  /** Pagination label after the range */
  subject: PropTypes.string,
  /** Total of items */
  totalItems: PropTypes.number,
  separator: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Pagination
