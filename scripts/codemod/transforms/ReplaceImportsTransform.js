// inspired by https://github.com/jcoreio/jscodeshift-transport
export default function replaceImportTransform(
  file,
  api,
  {
    moduleName = '@helpscout/hsds-react/',
    moduleNameTarget = '@helpscout/hsds-react-next/',
  }
) {
  const j = api.jscodeshift
  const root = j(file.source)
  replaceModuleNames(j, file.path, root, moduleName, moduleNameTarget)
  return root.toSource()
}

export const replaceModuleNames = (
  j,
  file,
  root,
  moduleName,
  moduleNameTarget
) => {
  const replaceAction = s => {
    return s.replace(moduleName, moduleNameTarget)
  }

  const processImport = nodePath => {
    const { node } = nodePath
    const {
      source: { value: moduleName },
    } = node
    const replacement = replaceAction(moduleName, { file, path: nodePath })
    if (typeof replacement === 'string') node.source.value = replacement
  }

  const imports = root.find(j.ImportDeclaration, {
    source: { value: v => v.includes(moduleName) },
  })
  imports.forEach(processImport)
}
