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

export const usePaginationData = props => {
  const {
    activePage,
    pluralizedSubject: pluralizedSubjectProp,
    rangePerPage,
    subject: subjectProp,
    totalItems: totalItemProp,
  } = props

  const {
    numberOfPages,
    currentPage,
    totalItems,
    startRange,
    endRange,
  } = React.useMemo(() => {
    const totalItems = Math.max(totalItemProp, 0)

    const numberOfPages = Math.ceil(totalItems / rangePerPage)

    const currentPage =
      activePage >= 1 ? Math.min(numberOfPages, Math.round(activePage)) : 1

    const startRange = formatNumber(
      Math.max(currentPage * rangePerPage - rangePerPage + 1, 0)
    )

    const endRange = formatNumber(
      Math.min(currentPage * rangePerPage, totalItems)
    )

    return { numberOfPages, currentPage, totalItems, startRange, endRange }
  }, [rangePerPage, totalItemProp, activePage])

  const pluralizedSubject = React.useMemo(() => {
    if (totalItems === 0) return subjectProp
    if (pluralizedSubjectProp && totalItems > 1) return pluralizedSubjectProp

    return pluralize(subjectProp, totalItems)
  }, [totalItems, pluralizedSubjectProp, subjectProp])

  return {
    currentPage,
    endRange,
    numberOfPages,
    pluralizedSubject,
    startRange,
    totalItems,
  }
}

const PaginationNavigation = props => {
  const { isLoading, currentPage, numberOfPages, onChange } = props
  const isNotFirstPage = currentPage > 1
  const isLastPage = currentPage >= numberOfPages

  const handleFirstClick = e => {
    e.preventDefault()
    onChange && onChange(1)
  }

  const handlePrevClick = e => {
    e.preventDefault()
    if (currentPage > 1) {
      onChange && onChange(currentPage - 1)
    }
  }

  const handleNextClick = e => {
    e.preventDefault()
    if (currentPage < numberOfPages) {
      onChange && onChange(currentPage + 1)
    }
  }

  const handleEndClick = e => {
    e.preventDefault()
    onChange && onChange(numberOfPages)
  }

  return (
    <NavigationUI data-testid="Pagination.Navigation">
      <KeypressListener
        keyCode={Keys.KEY_J}
        handler={handlePrevClick}
        noModifier
        type="keyup"
      />
      <KeypressListener
        keyCode={Keys.KEY_K}
        handler={handleNextClick}
        noModifier
        type="keyup"
      />
      {isNotFirstPage && (
        <>
          <ButtonIconUI
            key="firstButton"
            onClick={handleFirstClick}
            className="c-Pagination__firstButton"
            disabled={isLoading}
            title="First page"
            data-cy="Pagination-firstButton"
          >
            <Icon name="arrow-left-double-large" size="24" center />
          </ButtonIconUI>
          <ButtonIconUI
            key="prevButton"
            onClick={handlePrevClick}
            className="c-Pagination__prevButton"
            disabled={isLoading}
            title="Previous page (j)"
            data-cy="Pagination-prevButton"
          >
            <Icon name="arrow-left-single-large" size="24" center />
          </ButtonIconUI>
        </>
      )}
      {!isLastPage && (
        <>
          <ButtonIconUI
            key="nextButton"
            disabled={isLoading}
            onClick={handleNextClick}
            className="c-Pagination__nextButton"
            title="Next page (k)"
            data-cy="Pagination-nextButton"
          >
            <Icon name="arrow-right-single-large" size="24" center />
          </ButtonIconUI>
          <ButtonIconUI
            key="lastButton"
            disabled={isLoading}
            onClick={handleEndClick}
            className="c-Pagination__lastButton"
            title="Last page"
            data-cy="Pagination-lastButton"
          >
            <Icon name="arrow-right-double-large" size="24" center />
          </ButtonIconUI>
        </>
      )}
    </NavigationUI>
  )
}

const PaginationRange = ({
  totalItems,
  shouldShowNavigation,
  pluralizedSubject,
  startRange,
  endRange,
  separator,
}) => {
  const totalNode = (
    <span className="c-Pagination__total" data-cy="Pagination-totalItems">
      {formatNumber(totalItems)}
    </span>
  )

  if (!totalItems || !shouldShowNavigation) {
    return pluralizedSubject ? (
      <RangeUI data-testid="Pagination.Range">{totalNode}</RangeUI>
    ) : null
  }

  return (
    <Text className="c-Pagination__range">
      <RangeUI data-testid="Pagination.Range" data-cy="Pagination-startRange">
        {startRange}
      </RangeUI>
      {` `}-{` `}
      <RangeUI data-testid="Pagination.Range" data-cy="Pagination-endRange">
        {endRange}
      </RangeUI>
      {` `}
      {separator}
      {` `}
      {totalNode}
    </Text>
  )
}

export const Pagination = props => {
  const {
    activePage,
    className,
    isLoading,
    onChange,
    pluralizedSubject: pluralizedSubjectProp,
    rangePerPage,
    renderCustomContent,
    separator,
    showNavigation,
    subject: subjectProp,
    totalItems: totalItemProp,
    ...rest
  } = props

  const {
    numberOfPages,
    currentPage,
    totalItems,
    startRange,
    endRange,
    pluralizedSubject,
  } = usePaginationData(props)

  const shouldShowNavigation = showNavigation && numberOfPages > 1

  const componentClassName = classNames('c-Pagination', className)

  return (
    <PaginationUI
      data-testid="Pagination"
      role="navigation"
      aria-label="Pagination Navigation"
      {...getValidProps(rest)}
      className={componentClassName}
    >
      {renderCustomContent ? (
        renderCustomContent({
          currentPage,
          endRange,
          numberOfPages,
          startRange,
          pluralizedSubject,
        })
      ) : (
        <InformationUI data-testid="Pagination.Info">
          <Text size={13}>
            <PaginationRange
              totalItems={totalItems}
              shouldShowNavigation={shouldShowNavigation}
              pluralizedSubject={pluralizedSubject}
              startRange={startRange}
              endRange={endRange}
              separator={separator}
            />
            {pluralizedSubject && (
              <span className="c-Pagination__subject">{` ${pluralizedSubject}`}</span>
            )}
          </Text>
        </InformationUI>
      )}
      {shouldShowNavigation && (
        <PaginationNavigation
          currentPage={currentPage}
          isLoading={isLoading}
          numberOfPages={numberOfPages}
          onChange={onChange}
        />
      )}
    </PaginationUI>
  )
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
  /** Character between starting and ending range */
  separator: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Pagination
