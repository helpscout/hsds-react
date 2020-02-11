export const createActionTypes = (actionTypes = [], namespace = '@@HSDS') => {
  return actionTypes.reduce((types, type) => {
    return { ...types, [type]: `${namespace}/${type}` }
  }, {})
}
