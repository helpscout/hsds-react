export const getPropChanges = (props, nextProps) => {
  return Object.keys(props).filter(key => props[key] !== nextProps[key])
}

export const hasPropsChanges = (props, nextProps) => {
  return getPropChanges(props, nextProps).length > 0
}

export const hasPropsChangesWithoutChildren = (props, nextProps) => {
  return Object.keys(props).filter(key => props[key] !== nextProps[key] || key === 'children').length > 0
}

export const pureComponentShouldUpdate = (component, nextProps, nextState) => {
  return component.state !== nextState && hasPropsChanges(component.props, nextProps)
}

export const pureComponentShouldUpdateExcludingChildren = (component, nextProps, nextState) => {
  return component.state !== nextState && hasPropsChangesWithoutChildren(component.props, nextProps)
}
