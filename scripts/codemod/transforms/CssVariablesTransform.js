// Press ctrl+space for code completion
const cssVariables = {
  BlueConfigGlobalFontSize: 'HSDSGlobalFontSize',
  BlueConfigGlobalFontFamilyMono: 'HSDSGlobalFontFamilyMono',
  BlueConfigGlobalFontFamily: 'HSDSGlobalFontFamily',
}

export default function cssVariableTransform(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)
  const variableNames = Object.keys(cssVariables)

  const replaceVariables = str => {
    variableNames.forEach(k => {
      str = str.replace(`--${k}`, `--${cssVariables[k]}`)
    })
    return str
  }

  const processVariables = p => {
    const { node } = p
    const quasis = node.quasis.map(q =>
      j.templateElement(
        {
          cooked: replaceVariables(q.value.cooked),
          raw: replaceVariables(q.value.raw),
        },
        false
      )
    )

    node.quasis = quasis

    return node
  }

  const elements = root.find(j.TemplateLiteral).filter(p => {
    const hasVariable =
      p.value.quasis.length > 0 &&
      p.value.quasis.some(n => {
        const rawString = n.value.raw.toString()
        return variableNames.some(k => rawString.includes(k))
      })
    return hasVariable
  })

  return elements.replaceWith(processVariables).toSource()
}
