import { mapConnectedPropsAsProps } from '../Accordion.utils'

describe('mapConnectedPropsAsProps', () => {
  test('Tests isOpen against sections, if applicable', () => {
    const connectedProps = {
      sections: {
        a: true,
        b: false,
      },
      uuid: 'a',
    }

    const props = mapConnectedPropsAsProps(connectedProps)

    expect(props.isOpen).toBe(true)
  })

  test('Returns false if no sections are open', () => {
    const connectedProps = {
      sections: {
        a: false,
        b: false,
      },
      uuid: 'a',
    }

    const props = mapConnectedPropsAsProps(connectedProps)

    expect(props.isOpen).toBe(false)
  })

  test('Falls back to isOpen prop, if sections is empty', () => {
    const connectedProps = {
      sections: {},
      uuid: 'a',
      isOpen: true,
    }

    const props = mapConnectedPropsAsProps(connectedProps)

    expect(props.isOpen).toBe(true)
  })

  test('Falls back to isOpen prop, if sections is undefined', () => {
    const connectedProps = {
      uuid: 'a',
      isOpen: true,
    }

    const props = mapConnectedPropsAsProps(connectedProps)

    expect(props.isOpen).toBe(true)
  })

  test('Passes uuid through', () => {
    const connectedProps = {
      uuid: 'a',
      isOpen: true,
    }

    const props = mapConnectedPropsAsProps(connectedProps)

    expect(props.uuid).toBe('a')
  })
})
