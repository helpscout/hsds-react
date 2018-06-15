import { getClosestDocument } from '../../node'

afterEach(() => {
  global.document.innerHTML = ''
})

test('Returns global document, by default', () => {
  expect(getClosestDocument() === document).toBeTruthy()
})

test('Returns global document, if argument is not a node', () => {
  expect(getClosestDocument('div') === document).toBeTruthy()
})

test('Returns global document, node parent is global document', () => {
  const o = document.createElement('div')
  document.body.appendChild(o)

  expect(getClosestDocument(o) === document).toBeTruthy()
})

test('Returns closest document of iframe node', () => {
  const iframe = document.createElement('iframe')
  document.body.appendChild(iframe)
  iframe.contentDocument.write('<div></div>')

  const o = iframe.contentDocument.querySelector('div')
  const iframeDocument = iframe.contentDocument

  expect(getClosestDocument(o) === iframeDocument).toBeTruthy()
})
