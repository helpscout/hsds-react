export default function propProviderTransform(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)
  const comment = j.commentLine(
    'TODO: Remove PropProvider in favor of React.context',
    true,
    false
  )

  const processPropProvider = p => {
    const jSXElement = p.value
    jSXElement.comments = [comment]
  }

  const elements = root.findJSXElements('PropProvider')

  elements.forEach(processPropProvider)

  const imports = root.find(j.ImportDeclaration, {
    source: { value: v => v.includes('PropProvider') },
  })
  imports.forEach(processPropProvider)

  return root.toSource()
}
