import { luminance } from '../../color'

test('Calculate contrast between two RGB colors', () => {
  expect(luminance({ r: 0, g: 0, b: 0 })).toEqual(0)
  expect(luminance({ r: 255, g: 255, b: 255 })).toEqual(1)
  expect(+luminance({ r: 255, g: 10, b: 133 }).toFixed(2)).toEqual(0.23)
  expect(+luminance({ r: 102, g: 102, b: 102 }).toFixed(2)).toEqual(0.13)
})
