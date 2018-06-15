import { applyStylesToNode } from '../../node'

test('Returns false if node (arg) is invalid', () => {
  expect(applyStylesToNode()).not.toBeTruthy()
})

test('Returns node (arg) for invalid elements', () => {
  expect(applyStylesToNode(true)).toBe(true)
  expect(applyStylesToNode(1)).toBe(1)
  expect(applyStylesToNode('div')).toBe('div')
})

test('Returns node (arg) with untouched styles for invalid styles (arg)', () => {
  const o = document.createElement('div')
  expect(applyStylesToNode(o).style).toBe(o.style)
  expect(applyStylesToNode(o, true).style).toBe(o.style)
  expect(applyStylesToNode(o, 1).style).toBe(o.style)
})

test('Returns node with updated styles with valid styles (arg)', () => {
  const o = document.createElement('div')
  const styles = {
    background: 'red',
    padding: '10px',
  }
  expect(applyStylesToNode(o, styles).style.background).toBe('red')
  expect(applyStylesToNode(o, styles).style.padding).toBe('10px')
})

test('Style argument can resolve numbers', () => {
  const o = document.createElement('div')
  const styles = {
    padding: 10,
  }
  expect(applyStylesToNode(o, styles).style.padding).toBe('10px')
})

test('Style argument can resolve z-index numbers', () => {
  const o = document.createElement('div')
  const styles = {
    zIndex: 10,
  }
  expect(applyStylesToNode(o, styles).style.zIndex).toBe('10')
})
