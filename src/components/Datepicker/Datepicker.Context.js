/* istanbul ignore file */
import React from 'react'

export const datepickerContextDefaultValue = {
  focusedDate: null,
  endDate: null,
  startDate: null,
  isDateFocused: () => false,
  isDateSelected: () => false,
  isDateHovered: () => false,
  isDateBlocked: () => false,
  isFirstOrLastSelectedDate: () => false,
  onDateFocus: () => {},
  onDateHover: () => {},
  onDateSelect: () => {},
}

export default React.createContext(datepickerContextDefaultValue)
