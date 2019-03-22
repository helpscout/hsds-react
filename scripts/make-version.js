const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

const targetFilePath = path.resolve(__dirname, '../src/utilities/pkg.ts')

const setVersion = () => {
  const content = `
export default {
  version: '${pkg.version}'
}
  `.trim()

  console.log(`Generating ${targetFilePath}...`)
  fs.writeFileSync(targetFilePath, content)
}

setVersion()
