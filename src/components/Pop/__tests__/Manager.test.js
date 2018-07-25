import Manager from '../Manager'
import PopperManager from '../../Popper/Manager'

describe('Popper', () => {
  test('Is an adapter of Popper.Manager', () => {
    expect(Manager).toBe(PopperManager)
  })
})
