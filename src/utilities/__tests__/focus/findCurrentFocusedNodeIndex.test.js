import { findCurrentFocusedNodeIndex } from '../../focus'

afterEach(() => {
  document.body.innerHTML = ''
})

test('Returns falsey if with node (arg) is invalid', () => {
  expect(findCurrentFocusedNodeIndex()).toBeFalsy()
  expect(findCurrentFocusedNodeIndex(true)).toBeFalsy()
})

test('Returns index of current focused node', () => {
  document.body.innerHTML = `
    <span>Nope</span>
    <a href="#">Yes</a>
    <input type='text' value='Yes' />
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
  `
  const n = document.querySelector('input')
  const index = 1

  expect(findCurrentFocusedNodeIndex(n)).toBe(index)
})

test("Returns false if current node isn't focusable", () => {
  document.body.innerHTML = `
    <span class="nope">Nope</span>
    <a href="#">Yes</a>
    <input type='text' value='Yes' />
    <div>Nope</div>
    <select><option>Yes</option></select>
    <textarea>Yes</textarea>
    <h1>Nope</h1>
    <span tabindex="-1">Nope</span>
    <span tabindex="0">Yup</span>
    <span tabindex="10">Yup</span>
  `
  const n = document.querySelector('.nope')

  expect(findCurrentFocusedNodeIndex(n)).toBeFalsy()
})
