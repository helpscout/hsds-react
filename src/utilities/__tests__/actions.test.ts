import { createActionTypes } from '../actions'

describe('createActionTypes', () => {
  test('Returns an object by default', () => {
    expect(createActionTypes()).toEqual({})
  })

  test('Returns remapped actions from array of strings', () => {
    const actions = ['STAY_CLASSY', 'SAN_DIEGO']
    const actionTypes = createActionTypes(actions)

    expect(actionTypes.STAY_CLASSY).toContain('STAY_CLASSY')
    expect(actionTypes.SAN_DIEGO).toContain('SAN_DIEGO')
  })

  test('Adds default namespace', () => {
    const actions = ['STAY_CLASSY', 'SAN_DIEGO']
    const actionTypes = createActionTypes(actions)

    expect(actionTypes.STAY_CLASSY).not.toEqual('STAY_CLASSY')
    expect(actionTypes.STAY_CLASSY).toContain('@@')
  })

  test('Can customize namespace', () => {
    const actions = ['STAY_CLASSY', 'SAN_DIEGO']
    const actionTypes = createActionTypes(actions, '@@RON')

    expect(actionTypes.STAY_CLASSY).toEqual('@@RON/STAY_CLASSY')
    expect(actionTypes.SAN_DIEGO).toEqual('@@RON/SAN_DIEGO')
  })
})
