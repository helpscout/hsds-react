import icons from '../icons'
import iconsEmbed from '../icons.embed'
import iconsAll from '../icons.all'

test('Icon (index) should contains icons', () => {
  expect(icons).toBeTruthy()
  expect(icons.chat).toBeTruthy()
})

test('Icon (all) should contains icons', () => {
  expect(iconsAll).toBeTruthy()
  expect(iconsAll.chat).toBeTruthy()
})

test('Icon (embed) should contains icons', () => {
  expect(iconsEmbed).toBeTruthy()
  expect(iconsEmbed.chat).toBeTruthy()
})
