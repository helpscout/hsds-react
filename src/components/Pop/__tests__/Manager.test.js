import Manager from '../Pop.Manager'
import PopperManager from '../../Popper/Popper.Manager'

describe('Popper', () => {
  test('Is an adapter of Popper.Manager', () => {
    expect(Manager).toBe(PopperManager)
  })
})
