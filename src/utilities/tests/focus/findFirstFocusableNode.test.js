import { findFirstFocusableNode } from '../../focus'

afterEach(() => {
  document.body.innerHTML = ''
})

test('Returns falsey if no focusable nodes found', () => {
  const o = findFirstFocusableNode()
  expect(o).toBeFalsy()
})

test('Returns first focusable node', () => {
  document.body.innerHTML = `
    <span>Nope</span>
    <a>Yes</a>
    <input type='text' value='Yes' />
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
  `
  const o = findFirstFocusableNode()
  expect(o).toBeTruthy()
  expect(o.innerHTML).toContain('Yes')
  expect(o.tagName).toBe('A')
})

test('Returns first focusable node within scope', () => {
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
      <span tabindex="0">YupYup</span>
      <span tabindex="10">Yup</span>
    </div>
  `
  const n = document.body.querySelector('.scope')
  const o = findFirstFocusableNode(n)
  expect(o).toBeTruthy()
  expect(o.innerHTML).toBe('YupYup')
  expect(o.tagName).toBe('SPAN')
})
