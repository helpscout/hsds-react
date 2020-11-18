import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { MONTHS } from './Datepicker.constants'
import { getValidDateTimeString } from './Datepicker.utils'
import Datepicker from './'

describe('Datepicker', () => {
  test('should render the current date in the calendar by default', () => {
    const todayDate = new Date()
    const { getByText } = render(<Datepicker />)
    const todayNode = getByText(`${todayDate.getDate()}`)

    expect(
      getByText(`${MONTHS[todayDate.getMonth()]} ${todayDate.getFullYear()}`)
    ).toBeInTheDocument()
    expect(todayNode.getAttribute('datetime')).toBe(
      getValidDateTimeString(todayDate)
    )
    expect(
      getByText(`${todayDate.getDate()}`).parentElement.classList.contains(
        'is-today'
      )
    ).toBeTruthy()
    expect(
      getByText(`${todayDate.getDate()}`).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeFalsy()
    expect(
      getByText(`${todayDate.getDate()}`).parentElement.getAttribute(
        'aria-selected'
      )
    ).toBe('false')
  })

  test('should render with a given date if provided', () => {
    const someDate = new Date(2020, 2, 25)
    const { getByText, getAllByText, rerender } = render(
      <Datepicker startDate={someDate} />
    )
    const someDateNode = getAllByText(`${someDate.getDate()}`).filter(
      node => node.getAttribute('datetime') === getValidDateTimeString(someDate)
    )[0]

    expect(
      getByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    ).toBeInTheDocument()
    expect(someDateNode.getAttribute('datetime')).toBe(
      getValidDateTimeString(someDate)
    )
    expect(
      someDateNode.parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(someDateNode.parentElement.getAttribute('aria-selected')).toBe(
      'true'
    )

    const someOtherDate = new Date(2019, 2, 23)
    rerender(<Datepicker startDate={someOtherDate} />)
    const someOtherDateNode = getByText(`${someOtherDate.getDate()}`)

    expect(
      getByText(
        `${MONTHS[someOtherDate.getMonth()]} ${someOtherDate.getFullYear()}`
      )
    ).toBeInTheDocument()
    expect(someOtherDateNode.getAttribute('datetime')).toBe(
      getValidDateTimeString(someOtherDate)
    )
    expect(
      getByText(`${someOtherDate.getDate()}`).parentElement.classList.contains(
        'is-selected'
      )
    ).toBeTruthy()
    expect(
      getByText(`${someOtherDate.getDate()}`).parentElement.getAttribute(
        'aria-selected'
      )
    ).toBe('true')
  })

  test('should be able to pick the starting date of the week', () => {
    const someDate = new Date(2020, 2, 25)
    const { rerender } = render(<Datepicker startDate={someDate} />)

    const weekdays = document.querySelectorAll('.WeekdaysRow > div')
    expect(weekdays[0].textContent).toBe('Mo')

    rerender(<Datepicker startDate={someDate} firstDayOfWeek={0} />)

    const weekdays2 = document.querySelectorAll('.WeekdaysRow > div')
    expect(weekdays2[0].textContent).toBe('Su')
  })

  test('should be able to navigate month by month', () => {
    const someDate = new Date(2020, 2, 25)
    const { getByLabelText, queryByText, getByText } = render(
      <Datepicker startDate={someDate} />
    )

    const prevButton = getByLabelText(/previous month/i)
    const nextButton = getByLabelText(/next month/i)

    expect(
      getByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    ).toBeInTheDocument()

    user.click(prevButton)

    expect(
      queryByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    ).not.toBeInTheDocument()

    expect(
      getByText(`${MONTHS[someDate.getMonth() - 1]} ${someDate.getFullYear()}`)
    ).toBeInTheDocument()

    user.click(prevButton)

    expect(
      getByText(`${MONTHS[someDate.getMonth() - 2]} ${someDate.getFullYear()}`)
    ).toBeInTheDocument()

    user.click(nextButton)
    user.click(nextButton)
    user.click(nextButton)

    expect(
      getByText(`${MONTHS[someDate.getMonth() + 1]} ${someDate.getFullYear()}`)
    ).toBeInTheDocument()
  })

  test('should be able to navigate months by clicking the period calendar button once', () => {
    const someDate = new Date(2020, 2, 25)
    const { getByLabelText, getByText, queryByText, queryByLabelText } = render(
      <Datepicker startDate={someDate} />
    )

    const deepNavButton = queryByText(
      `${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`
    )

    user.click(deepNavButton)

    expect(
      queryByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    ).not.toBeInTheDocument()
    expect(queryByLabelText(/previous month/i)).not.toBeInTheDocument()
    expect(queryByLabelText(/next month/i)).not.toBeInTheDocument()
    expect(getByLabelText(/previous year/i)).toBeInTheDocument()
    expect(getByLabelText(/next year/i)).toBeInTheDocument()

    const prevButton = getByLabelText(/previous year/i)
    const nextButton = getByLabelText(/next year/i)

    user.click(prevButton)

    expect(getByText(`${someDate.getFullYear() - 1}`)).toBeInTheDocument()

    user.click(prevButton)

    expect(getByText(`${someDate.getFullYear() - 2}`)).toBeInTheDocument()

    user.click(nextButton)
    user.click(nextButton)
    user.click(nextButton)

    expect(getByText(`${someDate.getFullYear() + 1}`)).toBeInTheDocument()
  })

  test('should be able to navigate years by clicking the period calendar button twice', () => {
    const someDate = new Date(2020, 2, 25)
    const { getByLabelText, getByText, queryByText, queryByLabelText } = render(
      <Datepicker startDate={someDate} />
    )

    user.click(
      queryByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    )
    user.click(queryByText(`${someDate.getFullYear()}`))
    expect(getByText('2016–2027')).toBeInTheDocument()
    expect(queryByLabelText(/previous month/i)).not.toBeInTheDocument()
    expect(queryByLabelText(/next month/i)).not.toBeInTheDocument()
    expect(getByLabelText(/previous years/i)).toBeInTheDocument()
    expect(getByLabelText(/next years/i)).toBeInTheDocument()

    const prevButton = getByLabelText(/previous years/i)
    const nextButton = getByLabelText(/next years/i)

    user.click(prevButton)

    expect(getByText('2004–2015')).toBeInTheDocument()

    user.click(prevButton)

    expect(getByText('1992–2003')).toBeInTheDocument()

    user.click(nextButton)
    user.click(nextButton)
    user.click(nextButton)

    expect(getByText('2028–2039')).toBeInTheDocument()
  })

  test('should be able to select a month in the period calendar and navigate the daily calendar to the correct selection', () => {
    const someDate = new Date(2020, 2, 25)
    const { getByText, queryByText } = render(
      <Datepicker startDate={someDate} />
    )

    const deepNavButton = getByText(
      `${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`
    )

    user.click(deepNavButton)

    const julyButton = getByText(/jul/i)

    expect(
      queryByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    ).not.toBeInTheDocument()

    user.click(julyButton)

    expect(
      getByText(`${MONTHS[6]} ${someDate.getFullYear()}`)
    ).toBeInTheDocument()
  })

  test('should be able to select a year in the period calendar and navigate the daily calendar to the correct selection', () => {
    const someDate = new Date(2020, 2, 25)
    const { getByText } = render(<Datepicker startDate={someDate} />)

    user.click(
      getByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    )
    user.click(getByText(`${someDate.getFullYear()}`))
    user.click(getByText('2023'))
    user.click(getByText('Sep'))

    expect(getByText('September 2023')).toBeInTheDocument()
  })

  test('should be able to select a date', () => {
    const changeSpy = jest.fn()
    const someDate = new Date(2020, 2, 25)
    const { getByText } = render(
      <Datepicker startDate={someDate} onDateChange={changeSpy} />
    )

    const newDay = 21

    user.click(getByText(`${newDay}`))

    expect(changeSpy).toHaveBeenCalledTimes(1)
    expect(changeSpy).toHaveBeenCalledWith({
      endDate: new Date(2020, 2, newDay),
      focusedInput: null,
      startDate: new Date(2020, 2, newDay),
    })

    expect(
      getByText(`${newDay}`).parentElement.classList.contains('is-selected')
    ).toBeTruthy()
    expect(
      getByText(`${newDay}`).parentElement.getAttribute('aria-selected')
    ).toBe('true')

    user.click(
      getByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    )

    expect(getByText('Mar').parentElement.getAttribute('aria-selected')).toBe(
      'true'
    )

    user.click(getByText(`${someDate.getFullYear()}`))

    expect(getByText('2020').parentElement.getAttribute('aria-selected')).toBe(
      'true'
    )
  })

  test('should be able to select a date (trailing)', async () => {
    const changeSpy = jest.fn()
    const someDate = new Date(2020, 11, 25)
    const { getByText, getAllByText } = render(
      <Datepicker startDate={someDate} onDateChange={changeSpy} />
    )

    const trailingDay = getAllByText('1').filter(
      node => node.getAttribute('datetime') === '2021-01-01'
    )[0]

    user.click(trailingDay)

    expect(changeSpy).toHaveBeenCalledTimes(1)
    expect(changeSpy).toHaveBeenCalledWith({
      endDate: new Date(2021, 0, 1),
      focusedInput: null,
      startDate: new Date(2021, 0, 1),
    })

    await waitFor(() => {
      const selectedDay = getAllByText('1').filter(
        node => node.getAttribute('datetime') === '2021-01-01'
      )[0]

      expect(
        selectedDay.parentElement.classList.contains('is-selected')
      ).toBeTruthy()
      expect(selectedDay.parentElement.getAttribute('aria-selected')).toBe(
        'true'
      )
      expect(getByText('January 2021')).toBeInTheDocument()
    })
  })

  test('should be able to restrict navigation and selection of future dates', () => {
    const someDate = new Date()
    const { getByLabelText, getByText } = render(
      <Datepicker startDate={someDate} allowFutureDatePick={false} />
    )

    expect(getByLabelText(/next month/i).disabled).toBeTruthy()

    user.click(
      getByText(`${MONTHS[someDate.getMonth()]} ${someDate.getFullYear()}`)
    )

    expect(getByLabelText(/next year/i).disabled).toBeTruthy()

    user.click(getByText(`${someDate.getFullYear()}`))

    expect(getByLabelText(/next years/i).disabled).toBeTruthy()
  })

  describe('Range selection', () => {
    test('should allow range selection when enableRangeSelection is true', () => {
      const changeSpy = jest.fn()
      const someDate = new Date(2020, 10, 25)
      const { getByText } = render(
        <Datepicker
          enableRangeSelection
          startDate={someDate}
          onDateChange={changeSpy}
        />
      )
      const startDay = 21
      const middleDay = 22
      const endDay = 24

      user.click(getByText(`${startDay}`).parentElement)

      expect(
        getByText(`${startDay}`).parentElement.classList.contains(
          'is-selected-start'
        )
      ).toBeTruthy()

      user.hover(getByText(`${endDay}`).parentElement)

      expect(
        getByText(`${middleDay}`).parentElement.classList.contains(
          'is-within-hover-range'
        )
      ).toBeTruthy()

      expect(
        getByText(`${endDay}`).parentElement.classList.contains(
          'is-within-hover-range'
        )
      ).toBeTruthy()

      user.click(getByText(`${endDay}`).parentElement)

      expect(
        getByText(`${endDay}`).parentElement.classList.contains(
          'is-selected-end'
        )
      ).toBeTruthy()
      expect(
        getByText(`${middleDay}`).parentElement.classList.contains(
          'is-selected'
        )
      ).toBeTruthy()
      expect(changeSpy).toHaveBeenCalledTimes(2)
      expect(changeSpy).toHaveBeenCalledWith({
        endDate: new Date(2020, 10, endDay),
        focusedInput: null,
        startDate: new Date(2020, 10, startDay),
      })
    })

    test('should allow range selection with minimum days', () => {
      const changeSpy = jest.fn()
      const someDate = new Date(2020, 10, 25)
      const { getByText } = render(
        <Datepicker
          enableRangeSelection
          minBookingDays={4}
          startDate={someDate}
          onDateChange={changeSpy}
        />
      )
      const startDay = 21
      const middleDay = 22
      const middleDay2 = 23
      const endDay = 24

      user.click(getByText(`${startDay}`).parentElement)

      expect(
        getByText(`${startDay}`).parentElement.classList.contains(
          'is-selected-start'
        )
      ).toBeTruthy()

      user.hover(getByText(`${middleDay}`).parentElement)

      expect(
        getByText(`${middleDay}`).parentElement.getAttribute('disabled')
      ).toBe('')

      user.hover(getByText(`${middleDay2}`).parentElement)

      expect(
        getByText(`${middleDay2}`).parentElement.getAttribute('disabled')
      ).toBe('')

      expect(
        getByText(`${endDay}`).parentElement.getAttribute('disabled')
      ).toBe(null)

      user.click(getByText(`${endDay}`).parentElement)

      expect(changeSpy).toHaveBeenCalledTimes(2)
      expect(changeSpy).toHaveBeenCalledWith({
        endDate: new Date(2020, 10, endDay),
        focusedInput: null,
        startDate: new Date(2020, 10, startDay),
      })
    })

    test('should clear previous range if making a new one', () => {
      const changeSpy = jest.fn()
      const someDate = new Date(2020, 10, 25)
      const { getByText } = render(
        <Datepicker
          enableRangeSelection
          startDate={someDate}
          onDateChange={changeSpy}
        />
      )
      const startDay = 21
      const endDay = 24

      user.click(getByText(`${startDay}`).parentElement)
      user.click(getByText(`${endDay}`).parentElement)

      expect(changeSpy).toHaveBeenCalledTimes(2)
      expect(changeSpy).toHaveBeenCalledWith({
        endDate: new Date(2020, 10, endDay),
        focusedInput: null,
        startDate: new Date(2020, 10, startDay),
      })

      const startDay2 = 18
      const endDay2 = 22

      user.click(getByText(`${startDay2}`).parentElement)
      user.click(getByText(`${endDay2}`).parentElement)

      expect(changeSpy).toHaveBeenCalledTimes(4)
      expect(changeSpy).toHaveBeenCalledWith({
        endDate: new Date(2020, 10, endDay2),
        focusedInput: null,
        startDate: new Date(2020, 10, startDay2),
      })
    })
  })
})
