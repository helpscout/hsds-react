import {
  isJSDate,
  getJSDateFromString,
  isToday,
  isMonthInThePast,
  getValidDateTimeString,
  getLeadingDays,
  getTrailingDays,
  getTotalDaysSlots,
  getActiveYearRange,
} from './Datepicker.utils'

describe('Datepicker Utils', () => {
  test('isJSDate', () => {
    expect(isJSDate(new Date())).toBeTruthy()
    expect(isJSDate({})).toBeFalsy()
    expect(isJSDate('hola')).toBeFalsy()
  })

  test('getJSDateFromString', () => {
    const someDate = new Date()
    const someDateString = new Date().toLocaleString()

    expect(getJSDateFromString()).toBe(null)
    expect(getJSDateFromString(someDate)).toBe(someDate)
    expect(getJSDateFromString(someDateString)).toBeInstanceOf(Date)
  })

  test('isToday', () => {
    expect(isToday(new Date())).toBeTruthy()
    expect(isToday(new Date(1992, 3, 24))).toBeFalsy()
  })

  test('isMonthInThePast', () => {
    const currentDate = new Date()
    const pastDate = new Date(2020, 5, 29)
    const futureDate = new Date(
      currentDate.getFullYear,
      currentDate.getMonth + 1,
      4
    )

    expect(isMonthInThePast(pastDate)).toBeTruthy()
    expect(isMonthInThePast(futureDate)).toBeFalsy()
  })

  test('getValidDateTimeString', () => {
    const someDate = new Date(2020, 5, 29)

    expect(getValidDateTimeString()).toBe('')
    expect(getValidDateTimeString(someDate)).toBe('2020-06-29')
  })

  test('getLeadingDays', () => {
    const someDate = new Date(2020, 8, 29)

    // Week starting on Monday (default)
    expect(getLeadingDays(someDate).length).toBe(1)
    // Week starting on Sunday
    expect(getLeadingDays(someDate, 0).length).toBe(2)
  })

  test('getTrailingDays', () => {
    const someDate = new Date(2020, 8, 29)
    const allMonthDays = []

    for (let index = 0; index < 30; index++) {
      allMonthDays.push({})
    }
    // Week starting on Monday (default)
    expect(
      getTrailingDays(someDate, getLeadingDays(someDate), allMonthDays).length
    ).toBe(4)

    // Week starting on Sunday
    expect(
      getTrailingDays(someDate, getLeadingDays(someDate, 0), allMonthDays)
        .length
    ).toBe(3)
  })

  test('getTotalDaysSlots', () => {
    expect(getTotalDaysSlots(28)).toBe(28)
    expect(getTotalDaysSlots(36)).toBe(42)
    expect(getTotalDaysSlots(29)).toBe(35)
  })

  test('getActiveYearRange', () => {
    expect(getActiveYearRange(2020)).toStrictEqual([
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
    ])
  })
})
