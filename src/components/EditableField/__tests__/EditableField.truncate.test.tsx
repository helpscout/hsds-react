import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Truncated from '../EditableField.Truncate'
import {
  EF_TRUNC_COMPONENT_KEY,
  getComponentClassNames,
} from '../EditableField.utils'

const EF_TRUNC_CLASSNAMES: any = getComponentClassNames(EF_TRUNC_COMPONENT_KEY)

describe('Editable Field truncate', () => {
  test('should truncate with HSDS truncate if no splitter provided', () => {
    cy.render(<Truncated string="001122334455677889900" />)

    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.truncated}`).exists()).toBeTruthy()
  })

  test('should truncate with with splitter if provided', () => {
    cy.render(<Truncated string="email@something.com" splitter="@" />)

    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.withSplitter}`).exists()).toBeTruthy()
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.firstChunk}`).exists()).toBeTruthy()
    expect(
      cy.get(`.${EF_TRUNC_CLASSNAMES.splitterChunk}`).exists()
    ).toBeTruthy()
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.secondChunk}`).exists()).toBeTruthy()
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.firstChunk}`).text()).toBe('email')
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.splitterChunk}`).text()).toBe('@')
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.secondChunk}`).text()).toBe(
      'something.com'
    )
  })
})
