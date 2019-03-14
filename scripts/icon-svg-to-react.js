const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const mkdirp = require('mkdirp')

const svgIconDir = path.resolve(__dirname, '../src/icons')
const svgGlobIconPath = path.join(svgIconDir, '/*')
const reactDir = path.resolve(__dirname, '../src/components/Icons')
const iconComponentDir = path.resolve(__dirname, '../src/components/Icon')

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function getIconPaths() {
  return glob.sync(svgGlobIconPath)
}

// Converts the icon.svg path + extension
function getTargetComponentPathFromIcon(iconFilePath) {
  const iconName = path.basename(iconFilePath).replace('.svg', '')
  const componentFileName = `${iconName}.tsx`

  return path.join(reactDir, componentFileName)
}

function convertSvgToReact(filePath) {
  const svgContent = readFile(filePath)
  const targetFilePath = getTargetComponentPathFromIcon(filePath)

  // Convert default HTML attributes to React friendly attributes
  const parsedContent = svgContent
    .replace(/fill-rule/g, 'fillRule')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/enable-background/g, 'enableBackground')
    .replace(/"true"/g, '{true}')
    .replace(/"false"/g, '{false}')

  // The React SFC with the SVG markup
  const reactContent = `
import * as React from 'react'

const SvgComponent = () => (
  ${parsedContent}
)

export default SvgComponent
  `.trim()

  // Generate (write) the file with the new React SVG contents
  console.log(`Generating ${targetFilePath}...`)
  fs.writeFileSync(targetFilePath, reactContent)
}

function setupTargetDir() {
  if (!fs.existsSync(reactDir)) {
    mkdirp.sync(reactDir)
  }
}

function generateIconMap(iconPaths) {
  const relativeIconDir = '../Icons/'

  const iconMap = iconPaths
    .map(iconPath => {
      const fileBaseName = path.basename(iconPath).replace('.svg', '')
      const fileName = path.join(relativeIconDir, fileBaseName)

      return fileName
    })
    .reduce((map, fileName) => {
      const [dirPath, iconName] = fileName.split(relativeIconDir)
      return {
        ...map,
        [iconName]: fileName,
      }
    }, {})

  const targetFilePath = path.join(iconComponentDir, '/iconMap.ts')
  const jsonContent = JSON.stringify(iconMap, null, 2)
  const content = `
export default ${jsonContent}
  `.trim()

  // Generate the map to a .json file
  console.log(`Generating ${targetFilePath}...`)
  fs.writeFileSync(targetFilePath, content)
}

function iconSvgToReact() {
  setupTargetDir()

  const iconPaths = getIconPaths()
  iconPaths.forEach(convertSvgToReact)

  generateIconMap(iconPaths)
}

// Run it!
iconSvgToReact()
