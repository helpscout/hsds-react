import {
  nodeMatches
} from '../../node'

afterEach(() => {
  global.document.innerHTML = ''
})

test('Returns null if invalid arguments', () => {
  expect(nodeMatches()).toBe(null)
  expect(nodeMatches(document.body)).toBe(null)
  expect(nodeMatches(document.body, true)).toBe(null)
  expect(nodeMatches(document.body, 123)).toBe(null)
  expect(nodeMatches(document.body, {})).toBe(null)
  expect(nodeMatches(document.body, ['.nope'])).toBe(null)
})

test('Returns closest node specified', () => {
  document.body.innerHTML = `
    <div class='outer'>
      <div class='almostOuter'>
        <div class='inner'>
          Content
        </div>
      </div>
    </div>
  `

  const outer = document.querySelector('.outer')
  const almostOuter = document.querySelector('.almostOuter')
  const inner = document.querySelector('.inner')

  expect(nodeMatches(inner, '.inner')).toBe(true)
  expect(nodeMatches(almostOuter, '.almostOuter')).toBe(true)
  expect(nodeMatches(outer, '.outer')).toBe(true)
})
