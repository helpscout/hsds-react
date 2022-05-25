import '../app'
import {
  svgSet as iconSet,
  unload as unloadIcons,
} from '../../components/Icon/Icon.utils'
import {
  svgSet as illoSet,
  unload as unloadIllos,
} from '../../components/Illo/Illo.utils'
import { getComponentName } from '@hsds/utils-react'

afterEach(() => {
  unloadIcons()
  unloadIllos()
})

test('Loads SVG into Icon and Illo', () => {
  expect(Object.keys(iconSet).length).toBeGreaterThan(0)
  expect(Object.keys(illoSet).length).toBeGreaterThan(0)

  expect(getComponentName(iconSet.chat)).toBeTruthy()
  expect(getComponentName(iconSet.activity)).toBeTruthy()
})
