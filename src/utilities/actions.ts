export const createActionTypes = (
  actionTypes: Array<string> = [],
  namespace: string = '@@HSDS'
): any => {
  return actionTypes.reduce((types, type) => {
    return { ...types, [type]: `${namespace}/${type}` }
  }, {})
}
