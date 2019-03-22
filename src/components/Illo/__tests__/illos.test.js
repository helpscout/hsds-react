import illos from '../illos'
import illosEmbed from '../illos.embed'
import illosAll from '../illos.all'

test('Illo (index) should contains illos', () => {
  expect(illos).toBeTruthy()
  expect(illos.chat).toBeTruthy()
})

test('Illo (all) should contains illos', () => {
  expect(illosAll).toBeTruthy()
  expect(illosAll.chat).toBeTruthy()
})

test('Illo (embed) should contains illos', () => {
  expect(illosEmbed).toBeTruthy()
  expect(illosEmbed.chat).toBeTruthy()
})
