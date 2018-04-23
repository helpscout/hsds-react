const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export const calculateTimeoutPeriod = timestamp => {
  // Calculate the time passed since the timestamp in seconds
  const diff = Math.round(Math.abs(Date.now() - new Date(timestamp).valueOf()) / 1000)

  if (diff < MINUTE) {
    return 1000
  }

  if (diff < HOUR) {
    return 1000 * MINUTE
  }

  if (diff < DAY) {
    return 1000 * HOUR
  }

  return 0
}
