const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const slugify = require('slugify')

const ICON_FILES = path.resolve(__dirname, '../src/icons', '*.svg')

const updateIconFile = file => {
  const iconName = path.basename(file)
  const nextIconName = slugify(iconName, { lower: true })

  if (iconName !== nextIconName) {
    const nextFile = file.replace(iconName, nextIconName)
    console.log(`Renaming: ${iconName} -> ${nextIconName}`)
    fs.rename(file, nextFile)
  }
}

const updateIconFiles = (globPath = ICON_FILES) => {
  return glob(globPath, (err, files) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    files.forEach(updateIconFile)
  })
}

updateIconFiles()
