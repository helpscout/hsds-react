import * as components from '..'

const componentTestHelper = (component) => {
  test(component.name, () => {
    expect(component).toBeTruthy()
    expect(typeof component).toBe('function')
  })
}

Object.keys(components).forEach(key => {
  const component = components[key]
  if (typeof component === 'function') {
    componentTestHelper(component)
  }
})
