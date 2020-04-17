import { findPreviousFocusableNode } from '../../focus'

afterEach(() => {
  document.body.innerHTML = ''
})

test('Returns falsey if with invalid args found', () => {
  expect(findPreviousFocusableNode()).toBeFalsy()
  expect(findPreviousFocusableNode(true)).toBeFalsy()
  expect(findPreviousFocusableNode('div')).toBeFalsy()
})

test('Returns previous focusable node', () => {
  document.body.innerHTML = `
    <span>Nope</span>
    <a href="#">PREV</a>
    <input type='text' value='Yes' />
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
  `
  const n = document.body.querySelector('input')
  n.focus()
  const o = findPreviousFocusableNode(n)

  expect(o).toBeTruthy()
  expect(o.innerHTML).toContain('PREV')
  expect(o.tagName).toBe('A')
})

test('Returns previous focusable node within scope', () => {
  document.body.innerHTML = `
    <a href="#">Yes</a>
    <span>Nope</span>
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <div class="scope">
      <span tabindex="-1">Nope</span>
      <span tabindex="0">YupYup</span>
      <input type='text' value='Yes' />
      <span tabindex="10">Yup</span>
    </div>
  `
  const n = document.body.querySelector('.scope')
  const el = document.body.querySelector('input')
  el.focus()
  const o = findPreviousFocusableNode(el, n)

  expect(o).toBeTruthy()
  expect(o.innerHTML).toBe('YupYup')
  expect(o.tagName).toBe('SPAN')
})

test('Returns scope if previous focusable node does not exist', () => {
  document.body.innerHTML = `
    <span>Nope</span>
    <input type='text' value='Yes' />
  `
  const n = document.body.querySelector('input')
  n.focus()
  const o = findPreviousFocusableNode(n)

  expect(o).toBeTruthy()
  expect(o).toBe(document)
})
