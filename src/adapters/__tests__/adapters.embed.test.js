import '../embed'
import { ICONS, ILLOS } from '../../constants/global'

afterAll(() => {
  global[ICONS] = undefined
  global[ILLOS] = undefined
})

test('Adds icons to global', () => {
  expect(global[ICONS]).toBeTruthy()
})

test('Only loads a subset of Icon svg', () => {
  expect(global[ICONS].activity).toBeFalsy()
  expect(global[ICONS].chat).toBeTruthy()
  expect(global[ICONS].trophy).toBeFalsy()
  expect(global[ICONS].workflow).toBeFalsy()
})

test('Adds illos to global', () => {
  expect(global[ICONS]).toBeTruthy()
})
