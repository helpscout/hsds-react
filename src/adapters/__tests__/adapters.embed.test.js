import '../embed'
import {
  svgSet as iconSet,
  unload as unloadIcons,
} from '../../components/Icon/Icon.utils'
import {
  svgSet as illoSet,
  unload as unloadIllos,
} from '../../components/Illo/Illo.utils'

afterEach(() => {
  unloadIcons()
  unloadIllos()
})

test('Loads SVG into Icon and Illo', () => {
  expect(Object.keys(iconSet).length).toBeGreaterThan(0)
  expect(Object.keys(illoSet).length).toBeGreaterThan(0)

  expect(iconSet.chat).toContain('svg')
  expect(iconSet.activity).toBeFalsy()
})
