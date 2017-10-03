export const getPropChanges = (props, nextProps) => {
  return Object.keys(props).filter(key => props[key] !== nextProps[key])
}

export const hasPropChanges = (props, nextProps) => {
  return getPropChanges(props, nextProps).length > 0
}

export const hasPropChangesExcludingChildren = (props, nextProps) => {
  return Object.keys(props)
    .filter(key => key !== 'children')
    .filter(key => props[key] !== nextProps[key])
    .length > 0
}

export const pureComponentShouldUpdate = (component, nextProps, nextState) => {
  return hasPropChanges(component.state, nextState) || hasPropChanges(component.props, nextProps)
}

export const pureComponentShouldUpdateExcludingChildren = (component, nextProps, nextState) => {
  return hasPropChanges(component.state, nextState) || hasPropChangesExcludingChildren(component.props, nextProps)
}
