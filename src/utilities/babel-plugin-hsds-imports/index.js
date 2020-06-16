'use strict'
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = _default

var Components = _interopRequireWildcard(require('../../components'))
var COMPONENT_NAMES = Object.keys(Components)

function _default(babel) {
  const { types: t } = babel

  return {
    name: 'hsds-component-import',
    visitor: {
      ImportDeclaration(path, state) {
        const packages = state.opts.packages
          ? [].concat(state.opts.packages)
          : ['@helpscout/hsds-react']
        let packageName = path.node.source.value

        if (isWrongPackage(packageName, packages)) return null
        if (!areAllValidComponents(path.node.specifiers)) return null

        if (packageName.endsWith('/')) {
          packageName = packageName.slice(0, packageName.length - 1)
        }

        if (!packageName.includes('components')) {
          packageName += '/components'
        }

        const program = path.findParent(t.isProgram)

        path.node.specifiers.forEach(specifier => {
          const identifier = specifier.local
          const identifierName = identifier.name
          const defaultImportSpecifier = t.importDefaultSpecifier(identifier)
          let pkgPath = `${packageName}`

          if (!packageName.includes(identifierName)) {
            pkgPath += `/${identifierName}`
          }

          const newImportDeclaration = t.importDeclaration(
            [defaultImportSpecifier],
            t.stringLiteral(pkgPath)
          )
          program.node.body.unshift(newImportDeclaration)
        })

        path.remove()
      },
    },
  }
}

function areAllValidComponents(specifiers) {
  if (!specifiers.length) return false

  for (let i = 0; i < specifiers.length; i++) {
    if (!COMPONENT_NAMES.includes(specifiers[i].local.name)) {
      return false
    }
  }

  return true
}

function isWrongPackage(packageName, packages) {
  if (!packageName) return true

  let found = false

  for (let i = 0; i < packages.length; i++) {
    if (packageName.includes(packages[i])) {
      found = true
    }
  }

  return !found
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null
  var cache = new WeakMap()
  _getRequireWildcardCache = function() {
    return cache
  }
  return cache
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache()
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}
