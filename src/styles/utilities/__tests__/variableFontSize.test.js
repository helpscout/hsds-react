import { defaultProps } from '../variableFontSize'
import { variableFontSize } from '@hsds/utils-fonts'

test('Renders defaultProps if no arguments defined', () => {
  expect(variableFontSize()).toContain(defaultProps.baseFontSize)
  expect(variableFontSize()).toContain(defaultProps.fontSize)
})

test('Renders custom props', () => {
  const customProps = {
    varName: 'MILK-WAS-A-BAD-CHOICE',
    baseFontSize: 200,
    fontSize: 100,
  }
  expect(variableFontSize(customProps)).toContain(customProps.varName)
  expect(variableFontSize(customProps)).toContain(customProps.baseFontSize)
  expect(variableFontSize(customProps)).toContain(customProps.fontSize)
})

test('Extends custom props with defaults', () => {
  const customProps = {
    varName: 'MILK-WAS-A-BAD-CHOICE',
    fontSize: 100,
  }
  expect(variableFontSize(customProps)).toContain(customProps.varName)
  expect(variableFontSize(customProps)).toContain(defaultProps.baseFontSize)
  expect(variableFontSize(customProps)).toContain(customProps.fontSize)
})
