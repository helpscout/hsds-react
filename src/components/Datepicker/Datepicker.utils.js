export function isToday(someDate) {
  const today = new Date()

  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  )
}

export function isMonthInThePast(someDate) {
  const today = new Date()

  return (
    someDate.getFullYear() <= today.getFullYear() &&
    someDate.getMonth() < today.getMonth()
  )
}

export function getLeadingDays(date, startDay = 1) {
  const leadingDays = []
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const days = firstWeekday + 7 - (startDay + 7) - 1

  for (let i = days * -1; i <= 0; i++) {
    leadingDays.push({
      date: new Date(year, month, i),
      dayLabel: new Date(year, month, i).getDate(),
      leading: true,
    })
  }

  return leadingDays
}

export function getTrailingDays(date, leadingDays, allMonthDays) {
  const trailingDays = []
  const monthDays = allMonthDays.filter(day => typeof day === 'object')
  // const totalDaySlots = getTotalDaysSlots(monthDays.length + leadingDays.length)
  const totalDaySlots = 42
  const days = totalDaySlots - (leadingDays.length + monthDays.length)
  const nextMonth = new Date(date.setMonth(date.getMonth() + 1, 1))
  const year = date.getFullYear()

  for (let i = 1; i <= days; i++) {
    trailingDays.push({
      date: new Date(year, nextMonth.getMonth(), i),
      dayLabel: new Date(year, nextMonth.getMonth(), i).getDate(),
      trailing: true,
    })
  }

  return trailingDays
}

export function getTotalDaysSlots(numberOfDays) {
  if (numberOfDays === 28) return 28
  if (numberOfDays > 35) return 42
  return 35
}

export function getActiveYearRange(activeYear, initial) {
  const RANGE = 12
  const middleIndex = 4
  const startRange = initial
    ? Number.parseInt(activeYear) - middleIndex
    : Number.parseInt(activeYear) - RANGE
  const yearRange = []

  for (let index = 0; index < RANGE; index++) {
    yearRange.push(startRange + index)
  }

  return yearRange
}

export function getDayColor(
  isSelected,
  isDateToday,
  isSelectedStartOrEnd,
  isWithinHoverRange,
  isDisabled,
  leading,
  trailing
) {
  return ({
    selectedFirstOrLastColor,
    normalColor,
    selectedColor,
    rangeHoverColor,
    disabledColor,
    inactiveMonthColor,
    todayColor,
  }) => {
    if (isSelectedStartOrEnd) {
      return selectedFirstOrLastColor
    } else if (isDateToday) {
      return todayColor
    } else if (isSelected) {
      return selectedColor
    } else if (isWithinHoverRange) {
      return rangeHoverColor
    } else if (isDisabled) {
      return disabledColor
    } else if (leading || trailing) {
      return inactiveMonthColor
    } else {
      return normalColor
    }
  }
}
