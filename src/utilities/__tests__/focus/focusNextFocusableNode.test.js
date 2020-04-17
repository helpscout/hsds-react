import { focusNextFocusableNode } from '../../focus'

afterEach(() => {
  document.body.innerHTML = ''
})

test('Focuses next node, and returns next node', () => {
  let count = 0
  const focusCheck = () => {
    count = count + 1
  }

  document.body.innerHTML = `
    <span>Nope</span>
    <a href="#">Current</a>
    <input type='text' value='NEXT' />
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
  `
  const n = document.querySelector('a')
  document.querySelector('input').onfocus = focusCheck
  n.focus()
  const o = focusNextFocusableNode(n)

  expect(o).not.toBe(n)
  expect(document.activeElement.tagName).toBe('INPUT')
  expect(count).toBe(1)
})

test('Focuses next node within scope', () => {
  let count = 0
  const focusCheck = () => {
    count = count + 1
  }

  document.body.innerHTML = `
    <span>Nope</span>
    <div class="scope">
      <a href="#">Current</a>
      <input type='text' value='NEXT' />
    </div>
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
  `

  const scope = document.querySelector('.scope')
  const n = document.querySelector('a')
  document.querySelector('input').onfocus = focusCheck
  n.focus()
  const o = focusNextFocusableNode(n, scope)

  expect(o).not.toBe(n)
  expect(document.activeElement.tagName).toBe('INPUT')
  expect(count).toBe(1)
})

test('Focuses first focusable node if there are no next nodes', () => {
  let count = 0
  const focusCheck = () => {
    count = count + 1
  }

  document.body.innerHTML = `
    <input type='text' value='NEXT' />
    <span>Nope</span>
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
    <a href="#">Current</a>
  `

  const n = document.querySelector('a')
  document.querySelector('input').onfocus = focusCheck
  n.focus()
  const o = focusNextFocusableNode(n)

  expect(o).not.toBe(n)
  expect(document.activeElement.tagName).toBe('INPUT')
  expect(count).toBe(1)
})
