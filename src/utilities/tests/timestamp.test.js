import { calculateTimeoutPeriod } from '../timestamp'

describe('calculateTimeoutPeriod', () => {
  test('returns 0 when difference is more than a day', () => {
    const timestamp = new Date()
    timestamp.setTime(Date.now() - 60 * 60 * 24 * 3 * 1000)

    expect(calculateTimeoutPeriod(timestamp)).toEqual(0)
  })

  test('returns an hour (in ms) when the difference is more than an hour', () => {
    const timestamp = new Date()
    timestamp.setTime(Date.now() - 60 * 60 * 3 * 1000)

    expect(calculateTimeoutPeriod(timestamp)).toEqual(60 * 60 * 1000)
  })

  test('returns 15 seconds (in ms) when the difference is more than an minute', () => {
    const timestamp = new Date()
    timestamp.setTime(Date.now() - 60 * 3 * 1000)

    expect(calculateTimeoutPeriod(timestamp)).toEqual(15 * 1000)
  })

  test('returns a second (in ms) when the difference is less than an minute', () => {
    const timestamp = new Date()
    timestamp.setTime(Date.now() - 45 * 1000)

    expect(calculateTimeoutPeriod(timestamp)).toEqual(1000)
  })
})
