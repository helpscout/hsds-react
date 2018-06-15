import { focusPreviousFocusableNode } from '../../focus'

afterEach(() => {
  document.body.innerHTML = ''
})

test('Focuses previous node, and returns previous node', () => {
  let count = 0
  const focusCheck = () => {
    count = count + 1
  }

  document.body.innerHTML = `
    <span>Nope</span>
    <input type='text' value='NEXT' />
    <a>Current</a>
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
  const o = focusPreviousFocusableNode(n)

  expect(o).not.toBe(n)
  expect(document.activeElement.tagName).toBe('INPUT')
  expect(count).toBe(1)
})

test('Focuses previous node within scope', () => {
  let count = 0
  const focusCheck = () => {
    count = count + 1
  }

  document.body.innerHTML = `
    <span>Nope</span>
    <div class="scope">
      <input type='text' value='NEXT' />
      <a>Current</a>
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
  const o = focusPreviousFocusableNode(n, scope)

  expect(o).not.toBe(n)
  expect(document.activeElement.tagName).toBe('INPUT')
  expect(count).toBe(1)
})

test('Focuses last focusable node if there are no previous nodes', () => {
  let count = 0
  const focusCheck = () => {
    count = count + 1
  }

  document.body.innerHTML = `
    <a>Current</a>
    <span>Nope</span>
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
    <input type='text' value='NEXT' />
  `

  const n = document.querySelector('a')
  document.querySelector('input').onfocus = focusCheck
  n.focus()
  const o = focusPreviousFocusableNode(n)

  expect(o).not.toBe(n)
  expect(document.activeElement.tagName).toBe('INPUT')
  expect(count).toBe(1)
})
