const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export const calculateTimeoutPeriod = timestamp => {
  // Calculate the time passed since the timestamp in seconds
  const diff = Math.round(
    Math.abs(Date.now() - new Date(timestamp).valueOf()) / 1000
  )

  if (diff < MINUTE) {
    // Once every second
    return 1000
  }

  if (diff < HOUR) {
    // Once every minute
    return 1000 * MINUTE
  }

  if (diff < DAY) {
    // Once every hour
    return 1000 * HOUR
  }

  // Never
  return 0
}
