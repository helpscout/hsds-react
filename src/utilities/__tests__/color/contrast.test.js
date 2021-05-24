import { contrast } from '../../color'

test('Calculate contrast between two RGB colors', () => {
  expect(contrast({ r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 })).toEqual(1)
  expect(contrast({ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })).toEqual(21)
  expect(
    +contrast({ r: 102, g: 102, b: 102 }, { r: 0, g: 0, b: 0 }).toFixed(2)
  ).toEqual(3.66)
  expect(
    +contrast({ r: 102, g: 102, b: 102 }, { r: 255, g: 255, b: 255 }).toFixed(2)
  ).toEqual(5.74)
  expect(
    +contrast({ r: 255, g: 10, b: 133 }, { r: 0, g: 0, b: 0 }).toFixed(2)
  ).toEqual(5.63)
  expect(
    +contrast({ r: 245, g: 36, b: 140 }, { r: 255, g: 255, b: 255 }).toFixed(2)
  ).toEqual(3.81)
})
