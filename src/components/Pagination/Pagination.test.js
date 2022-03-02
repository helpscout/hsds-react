import React from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import Pagination, { usePaginationData, pluralize } from './Pagination'
import { simulateKeyPress } from '../KeypressListener/KeypressListener.test'
import Keys from '../../constants/Keys'

describe('className', () => {
  test('Has a default className', () => {
    const { getByTestId } = render(<Pagination />)
    expect(getByTestId('Pagination')).toHaveClass('c-Pagination')
  })
  test('Add custom className', () => {
    const customClass = 'piano-key-neck-tie'
    const { getByTestId } = render(<Pagination className={customClass} />)

    expect(getByTestId('Pagination')).toHaveClass(customClass)
  })
})
describe('Subject', () => {
  test('Does not render a subject by default', () => {
    const { container } = render(<Pagination />)
    const s = container.querySelector('.c-Pagination__subject')

    expect(s).toBeFalsy()
  })

  test('Renders a subject, if defined', () => {
    const subject = 'Customer'
    const { container, queryByText } = render(<Pagination subject={subject} />)
    const s = container.querySelector('.c-Pagination__subject')

    expect(s).toBeTruthy()
    expect(queryByText(subject)).toBeTruthy()
  })

  test('Renders a space before the subject, if defined', () => {
    const subject = 'Customer'
    const { container } = render(<Pagination subject={subject} />)
    const s = container.querySelector('.c-Pagination__subject')
    expect(s.textContent.indexOf(' ')).toBe(0)
  })

  test('Renders a default subject if no totalItems is provided', () => {
    const subject = 'Customer'
    const { queryByText } = render(<Pagination subject={subject} />)

    expect(queryByText(subject)).toBeTruthy()
  })

  test('Renders a pluralize subject', () => {
    const subject = 'Customer'
    const { queryByText } = render(
      <Pagination subject={subject} totalItems={100} />
    )

    expect(queryByText('Customers')).toBeTruthy()
  })

  test('Renders a custom pluralized subject', () => {
    const subject = 'Customer'
    const pluralizedSubject = 'Customerzzz'

    const { queryByText } = render(
      <Pagination
        subject={subject}
        totalItems={100}
        pluralizedSubject={pluralizedSubject}
      />
    )
    expect(queryByText(pluralizedSubject)).toBeTruthy()
  })

  test('should render custom content', () => {
    const subject = 'customer'
    const totalItems = 100
    const { container } = render(
      <Pagination
        subject={subject}
        totalItems={totalItems}
        renderCustomContent={({
          startRange,
          endRange,
          numberOfPages,
          currentPage,
          pluralizedSubject,
        }) => {
          return (
            <div className="custom-content">
              {totalItems} total {pluralizedSubject} • 26 active
            </div>
          )
        }}
      />
    )

    const s = container.querySelector('.custom-content')

    expect(s).toHaveTextContent('100 total customers • 26 active')
  })
})

describe('Navigation', () => {
  test('Does not render a navigation by default', () => {
    const { queryByTestId } = render(<Pagination />)

    expect(queryByTestId('Pagination.Navigation')).toBeFalsy()
  })

  test('Does not render a navigation, if defined && number of pages <= 1', () => {
    const { queryByTestId } = render(
      <Pagination showNavigation={true} totalItems={10} rangePerPage={10} />
    )

    expect(queryByTestId('Pagination.Navigation')).toBeFalsy()
  })

  test('Renders a navigation, if defined && number of pages > 1', () => {
    const { queryByTestId } = render(
      <Pagination showNavigation={true} totalItems={10} rangePerPage={5} />
    )

    expect(queryByTestId('Pagination.Navigation')).toBeTruthy()
  })

  test('Display next & last button on first page', () => {
    const { container } = render(
      <Pagination showNavigation={true} totalItems={10} rangePerPage={5} />
    )

    const first = container.querySelector('.c-Pagination__firstButton')
    const prev = container.querySelector('.c-Pagination__prevButton')
    const next = container.querySelector('.c-Pagination__nextButton')
    const last = container.querySelector('.c-Pagination__lastButton')

    expect(first).toBeFalsy()
    expect(prev).toBeFalsy()
    expect(next).toBeTruthy()
    expect(last).toBeTruthy()
  })

  test('Display prev & first button after first page', () => {
    const { container } = render(
      <Pagination
        showNavigation={true}
        totalItems={15}
        rangePerPage={5}
        activePage={2}
      />
    )

    const first = container.querySelector('.c-Pagination__firstButton')
    const prev = container.querySelector('.c-Pagination__prevButton')
    const next = container.querySelector('.c-Pagination__nextButton')
    const last = container.querySelector('.c-Pagination__lastButton')

    expect(first).toBeTruthy()
    expect(prev).toBeTruthy()
    expect(next).toBeTruthy()
    expect(last).toBeTruthy()
  })

  test('Hides next & last button on last page', () => {
    const { container } = render(
      <Pagination
        showNavigation={true}
        totalItems={15}
        rangePerPage={5}
        activePage={3}
      />
    )

    const next = container.querySelector('Button.c-Pagination__nextButton')
    const last = container.querySelector('Button.c-Pagination__lastButton')

    expect(next).toBeFalsy()
    expect(last).toBeFalsy()
  })

  test('Disables all buttons when loading', () => {
    const { container } = render(
      <Pagination
        isLoading={true}
        showNavigation={true}
        totalItems={15}
        rangePerPage={5}
        activePage={2}
      />
    )

    const first = container.querySelector('Button.c-Pagination__firstButton')
    const prev = container.querySelector('Button.c-Pagination__prevButton')
    const next = container.querySelector('Button.c-Pagination__nextButton')
    const last = container.querySelector('Button.c-Pagination__lastButton')

    expect(first).toHaveAttribute('disabled')
    expect(prev).toHaveAttribute('disabled')
    expect(next).toHaveAttribute('disabled')
    expect(last).toHaveAttribute('disabled')
  })
})

describe('usePaginationData', () => {
  test('Sets 1 as the minimum for currentPage', () => {
    const props = {
      totalItems: 15,
      rangePerPage: 5,
      activePage: 0,
    }

    const { result } = renderHook(() => usePaginationData(props))
    expect(result.current.currentPage).toBe(1)
  })

  test('Sets the number of pages as the maximum for currentPage', () => {
    const totalItems = 15
    const rangePerPage = 5
    const props = {
      totalItems,
      rangePerPage,
      activePage: 200,
    }

    const { result } = renderHook(() => usePaginationData(props))

    expect(result.current.currentPage).toBe(totalItems / rangePerPage)
  })

  test('Sets numberOfPages on even number', () => {
    const totalItems = 15
    const rangePerPage = 5
    const props = {
      totalItems,
      rangePerPage,
      activePage: 1,
    }

    const { result } = renderHook(() => usePaginationData(props))

    expect(result.current.numberOfPages).toBe(3)
  })

  test('Sets numberOfPages on uneven number', () => {
    const totalItems = 17
    const rangePerPage = 5

    const props = {
      totalItems,
      rangePerPage,
      activePage: 1,
    }

    const { result } = renderHook(() => usePaginationData(props))

    expect(result.current.numberOfPages).toBe(4)
  })

  test('Sets correctly start and end range on last page', () => {
    const totalItems = 15
    const rangePerPage = 5

    const props = {
      totalItems,
      rangePerPage,
      activePage: 3,
    }

    const { result } = renderHook(() => usePaginationData(props))

    expect(result.current.startRange).toBe('11')
    expect(result.current.endRange).toBe('15')
  })

  test('Sets correctly start and uneven end range on last page', () => {
    const totalItems = 17
    const rangePerPage = 5

    const props = {
      totalItems,
      rangePerPage,
      activePage: 10,
    }

    const { result } = renderHook(() => usePaginationData(props))

    expect(result.current.startRange).toBe('16')
    expect(result.current.endRange).toBe('17')
  })

  test('Sets correctly start and end range on first page', () => {
    const totalItems = 15
    const rangePerPage = 5

    const props = {
      totalItems,
      rangePerPage,
      activePage: 1,
    }

    const { result } = renderHook(() => usePaginationData(props))

    expect(result.current.startRange).toBe('1')
    expect(result.current.endRange).toBe('5')
  })
})

describe('Range', () => {
  test('Hides range if less than 2 pages', () => {
    const totalItems = 5
    const rangePerPage = 5
    const { container } = render(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
      />
    )

    expect(container.querySelector('.c-Pagination__range')).toBeFalsy()
  })

  test('Shows totalItems if less than 2 pages', () => {
    const totalItems = 5
    const rangePerPage = 5
    const subject = 'Customers'
    const { getByTestId } = render(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        subject={subject}
      />
    )

    expect(getByTestId('Pagination.Range')).toHaveTextContent(`${totalItems}`)
    expect(getByTestId('Pagination.Info')).toHaveTextContent(
      `${totalItems} ${subject}`
    )
  })
})

describe('Clicks', () => {
  test('Navigates to next page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const { container } = render(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        onChange={changeWatcher}
      />
    )
    user.click(container.querySelector('Button.c-Pagination__nextButton'))
    expect(changeWatcher).toHaveBeenCalledWith(2)
  })

  test('Navigates to last page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const { container } = render(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        onChange={changeWatcher}
      />
    )
    user.click(container.querySelector('Button.c-Pagination__lastButton'))
    expect(changeWatcher).toHaveBeenCalledWith(4)
  })

  test('Navigates to first page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const { container } = render(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={10}
        onChange={changeWatcher}
      />
    )
    user.click(container.querySelector('Button.c-Pagination__firstButton'))
    expect(changeWatcher).toHaveBeenCalledWith(1)
  })

  test('Navigates to prev page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    const { container } = render(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={10}
        onChange={changeWatcher}
      />
    )
    user.click(container.querySelector('Button.c-Pagination__prevButton'))
    expect(changeWatcher).toHaveBeenCalledWith(3)
  })
})

describe('Keyboard', () => {
  test('Pressing j navigate to previous page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    render(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={2}
        onChange={changeWatcher}
      />
    )
    simulateKeyPress(Keys.KEY_J)
    expect(changeWatcher).toHaveBeenCalledWith(1)
  })

  test('Pressing k navigate to next page', () => {
    const totalItems = 17
    const rangePerPage = 5
    const changeWatcher = jest.fn()

    render(
      <Pagination
        showNavigation={true}
        totalItems={totalItems}
        rangePerPage={rangePerPage}
        activePage={1}
        onChange={changeWatcher}
      />
    )
    simulateKeyPress(Keys.KEY_K)
    expect(changeWatcher).toHaveBeenCalledWith(2)
  })
})

describe('Pluralize', () => {
  test('Pluralizes a zero count', () => {
    expect(pluralize('message', 0)).toBe('messages')
  })

  test('Pluralizes a one count', () => {
    expect(pluralize('message', 1)).toBe('message')
  })

  test('Pluralizes a +2 count', () => {
    expect(pluralize('message', 100)).toBe('messages')
  })

  test('Pluralizes a one count, by default', () => {
    expect(pluralize('message')).toBe('message')
  })

  test('Returns an empty string if value arg is falsy', () => {
    expect(pluralize()).toBe('')
  })

  test('Skip pluralize if string is ending with an s', () => {
    expect(pluralize('messages')).toBe('messages')
  })
})
