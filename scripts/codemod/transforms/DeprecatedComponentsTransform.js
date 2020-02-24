export default function deprecatedComponentTransform(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  const processDeprecatedComponent = (p, componentName) => {
    const comment = j.commentLine(
      `TODO: ${componentName} is deprecated, please either remove the component or change with a better version`,
      true,
      false
    )

    const jSXElement = p.value
    jSXElement.comments = [comment]
  }

  const components = [
    'HsApp',
    'PromoCard',
    'Huzzahs',
    'SideNavigation',
    'SidebarCollapsibleCard',
    'Samp',
    'DetailList',
    'Code',
    'StatusAvatar',
  ]
  components.forEach(c => {
    const elements = root.findJSXElements(c)
    elements.forEach(p => {
      const componentName = p.value.name.name
      processDeprecatedComponent(p, componentName)
    })

    const imports = root.find(j.ImportDeclaration, {
      source: { value: v => v.includes(c) },
    })
    imports.forEach(p => {
      const {
        source: { value: moduleName },
      } = p.node
      const entries = moduleName.split('/')
      processDeprecatedComponent(p, entries[entries.length - 1])
    })
  })

  return root.toSource()
}
