import { findLastFocusableNode } from '../../focus'

afterEach(() => {
  document.body.innerHTML = ''
})

test('Returns falsey if no focusable nodes found', () => {
  const o = findLastFocusableNode()
  expect(o).toBeFalsy()
})

test('Returns last focusable node', () => {
  document.body.innerHTML = `
    <span>Nope</span>
    <a>Yup</a>
    <input type='text' value='Yes' />
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
    <a href="#">Yes</a>
    <span>Nope</span>
  `
  const o = findLastFocusableNode()
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
      <span tabindex="10">Yup</span>
      <span tabindex="0">YupYup</span>
    </div>
  `
  const n = document.body.querySelector('.scope')
  const o = findLastFocusableNode(n)
  expect(o).toBeTruthy()
  expect(o.innerHTML).toBe('YupYup')
  expect(o.tagName).toBe('SPAN')
})
