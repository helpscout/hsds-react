import { findFocusableNodes } from '../../focus'

const NodeList = window.NodeList

afterEach(() => {
  document.body.innerHTML = ''
})

test('Returns empty nodeList if no focusable nodes found', () => {
  const o = findFocusableNodes()
  expect(o instanceof NodeList).toBeTruthy()
  expect(o.length).toBe(0)
})

test('Returns a list of focusable nodes', () => {
  document.body.innerHTML = `
    <a>Yes</a>
    <span>Nope</span>
    <input type='text' value='Yes' />
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
  `
  const o = findFocusableNodes()
  expect(o instanceof NodeList).toBeTruthy()
  expect(o.length).toBe(6)
})

test('Returns a list of focusable nodes within scope', () => {
  document.body.innerHTML = `
    <a>Yes</a>
    <span>Nope</span>
    <input type='text' value='Yes' />
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <div class="scope">
      <span tabindex="-1">Nope</span>
      <span tabindex="0">Yup</span>
      <span tabindex="10">Yup</span>
    </div>
  `
  const n = document.body.querySelector('.scope')
  const o = findFocusableNodes(n)
  expect(o instanceof NodeList).toBeTruthy()
  expect(o.length).toBe(2)
})
