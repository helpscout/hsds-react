import {
  getClosestNode
} from '../../node'

afterEach(() => {
  global.document.innerHTML = ''
})

test('Returns null if invalid arguments', () => {
  expect(getClosestNode()).toBe(null)
  expect(getClosestNode(document.body)).toBe(null)
  expect(getClosestNode(document.body, true)).toBe(null)
  expect(getClosestNode(document.body, 123)).toBe(null)
  expect(getClosestNode(document.body, {})).toBe(null)
  expect(getClosestNode(document.body, ['.nope'])).toBe(null)
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

  expect(getClosestNode(inner, '.almostOuter')).toBe(almostOuter)
  expect(getClosestNode(inner, '.outer')).toBe(outer)
})
