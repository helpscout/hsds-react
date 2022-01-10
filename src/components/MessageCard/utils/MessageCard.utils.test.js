import { replaceMessageVariables } from './MessageCard.utils'

describe('MessageCard.utils', () => {
  const variables = [
    {
      id: 'customer.firstName',
      display: 'First Name',
    },
    {
      id: 'customer.lastName',
      display: 'Last Name',
    },
    {
      id: 'customVariable',
      display: 'Custom Variable',
    },
  ]

  it('should replace variables in provided text with fallback value', () => {
    const text = `<p>Hi {%customer.firstName,fallback=there%} {%customer.lastName,fallback=you%}</p>`

    const result = replaceMessageVariables(text, variables)

    expect(result).toEqual(
      `<p>Hi <span class="hsds-message-card-variable">there</span> <span class="hsds-message-card-variable">you</span></p>`
    )
  })

  it('should replace variables in provided text with variable label when it has not fallback', () => {
    const text = `<p>Hi {%customer.firstName,fallback=there%} {%customVariable%}</p>`

    const result = replaceMessageVariables(text, variables)

    expect(result).toEqual(
      `<p>Hi <span class="hsds-message-card-variable">there</span> <span class="hsds-message-card-variable">Custom Variable</span></p>`
    )
  })

  it('should replace variables in provided text with variable label when empty fallback', () => {
    const text = `<p>Hi {%customer.firstName,fallback=%}</p>`

    const result = replaceMessageVariables(text, variables)

    expect(result).toEqual(
      `<p>Hi <span class="hsds-message-card-variable">First Name</span></p>`
    )
  })

  it('should NOT replace unknown variable', () => {
    const text = `<p>Hi {%customer.unknown,fallback=Test%}</p>`

    const result = replaceMessageVariables(text, variables)

    expect(result).toEqual(text)
  })
})
