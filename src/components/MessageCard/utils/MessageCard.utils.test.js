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
      `<p>Hi <span class="hsds-message-card-variable" title="there"><span class="hsds-message-card-variable__text">there</span></span> <span class="hsds-message-card-variable" title="you"><span class="hsds-message-card-variable__text">you</span></span></p>`
    )
  })

  it('should replace variables in provided text with variable label when it has not fallback', () => {
    const text = `<p>Hi {%customer.firstName,fallback=there%} {%customVariable%}</p>`

    const result = replaceMessageVariables(text, variables)

    expect(result).toEqual(
      `<p>Hi <span class="hsds-message-card-variable" title="there"><span class="hsds-message-card-variable__text">there</span></span> <span class="hsds-message-card-variable" title="Custom Variable"><span class="hsds-message-card-variable__text">Custom Variable</span></span></p>`
    )
  })

  it('should replace variables in provided text with variable label when empty fallback', () => {
    const text = `<p>Hi {%customer.firstName,fallback=%} {%customer.lastName,fallback=you%}</p>`

    const result = replaceMessageVariables(text, variables)

    expect(result).toEqual(
      `<p>Hi <span class="hsds-message-card-variable" title="First Name"><span class="hsds-message-card-variable__text">First Name</span></span> <span class="hsds-message-card-variable" title="you"><span class="hsds-message-card-variable__text">you</span></span></p>`
    )
  })

  it('should replace variables in provided text when fallback contains % sign', () => {
    const text = `<p>Hi {%customer.firstName,fallback=there % there%} {%customer.lastName,fallback=you % there%}</p>`

    const result = replaceMessageVariables(text, variables)

    expect(result).toEqual(
      `<p>Hi <span class="hsds-message-card-variable" title="there % there"><span class="hsds-message-card-variable__text">there % there</span></span> <span class="hsds-message-card-variable" title="you % there"><span class="hsds-message-card-variable__text">you % there</span></span></p>`
    )
  })

  it('should NOT replace unknown variable', () => {
    const text = `<p>Hi {%customer.unknown,fallback=Test%}</p>`

    const result = replaceMessageVariables(text, variables)

    expect(result).toEqual(text)
  })
})
