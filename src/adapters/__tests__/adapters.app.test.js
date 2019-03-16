import '../app'
import { ICONS, ILLOS } from '../../constants/global'

afterAll(() => {
  global[ICONS] = undefined
  global[ILLOS] = undefined
})

test('Adds icons to global', () => {
  expect(global[ICONS]).toBeTruthy()
})

test('Only loads all Icon svg', () => {
  expect(global[ICONS].activity).toBeTruthy()
  expect(global[ICONS].chat).toBeTruthy()
  expect(global[ICONS].trophy).toBeTruthy()
  expect(global[ICONS].workflow).toBeTruthy()
})

test('Adds illos to global', () => {
  expect(global[ICONS]).toBeTruthy()
})
