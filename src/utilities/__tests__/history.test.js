import { createLocation } from '../history'

describe('createLocation', () => {
  test('Can create a history from a plain string path', () => {
    const location = createLocation('/hello')

    expect(location.pathname).toBe('/hello')
    expect(location.key).toBeTruthy()
  })

  test('Strips params from path', () => {
    const location = createLocation('/hello/:post/:id/there')

    expect(location.pathname).toBe('/hello/there')
    expect(location.key).toBeTruthy()
  })

  test('Can customize key for path argument', () => {
    const key = 'abc123'
    const location = createLocation('/hello', null, key)

    expect(location.pathname).toBe('/hello')
    expect(location.key).toBe(key)
  })

  test('Can create location from another location', () => {
    const prevLocation = createLocation('/hello')
    prevLocation.pathname = '/hello/there'
    const location = createLocation(null, null, null, prevLocation)

    expect(location.pathname).toBe('/hello/there')
  })

  test('Can customize key for location argument', () => {
    const prevLocation = createLocation('/hello')
    prevLocation.pathname = '/hello/there'

    const key = 'abc123'

    const location = createLocation(null, null, key, prevLocation)

    expect(location.pathname).toBe('/hello/there')
    expect(location.key).toBe(key)
  })
})
