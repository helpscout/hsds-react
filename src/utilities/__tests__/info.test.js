import { HSDS_REACT_NAMESPACE, setPackageVersionToGlobal } from '../info'

beforeEach(() => {
  window[HSDS_REACT_NAMESPACE] = undefined
})

afterEach(() => {
  window[HSDS_REACT_NAMESPACE] = undefined
})

describe('setPackageVersionToGlobal', () => {
  test('Sets the version to window', () => {
    setPackageVersionToGlobal()

    const info = window[HSDS_REACT_NAMESPACE]

    expect(info).toBeTruthy()
    expect(info.version).toBeTruthy()
  })
})
