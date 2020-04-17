import { findNextFocusableNode } from '../../focus'

afterEach(() => {
  document.body.innerHTML = ''
})

test('Returns falsey if with invalid args found', () => {
  expect(findNextFocusableNode()).toBeFalsy()
  expect(findNextFocusableNode(true)).toBeFalsy()
  expect(findNextFocusableNode('div')).toBeFalsy()
})

test('Returns next focusable node', () => {
  document.body.innerHTML = `
    <span>Nope</span>
    <input type='text' value='Yes' />
    <a href="#">NEXT</a>
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
  const o = findNextFocusableNode(n)

  expect(o).toBeTruthy()
  expect(o.innerHTML).toContain('NEXT')
  expect(o.tagName).toBe('A')
})

test('Returns next focusable node within scope', () => {
  document.body.innerHTML = `
    <a href="#">Yes</a>
    <span>Nope</span>
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <div class="scope">
      <span tabindex="-1">Nope</span>
      <input type='text' value='Yes' />
      <span tabindex="0">YupYup</span>
      <span tabindex="10">Yup</span>
    </div>
  `
  const n = document.body.querySelector('.scope')
  const el = document.body.querySelector('input')
  el.focus()
  const o = findNextFocusableNode(el, n)

  expect(o).toBeTruthy()
  expect(o.innerHTML).toBe('YupYup')
  expect(o.tagName).toBe('SPAN')
})

test('Returns scope if next focusable node does not exist', () => {
  document.body.innerHTML = `
    <span>Nope</span>
    <input type='text' value='Yes' />
  `
  const n = document.body.querySelector('input')
  n.focus()
  const o = findNextFocusableNode(n)

  expect(o).toBeTruthy()
  expect(o).toBe(document)
})
