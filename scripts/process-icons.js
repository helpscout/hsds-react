const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const slugify = require('slugify')
const argv = require('yargs').argv
const util = require('util')
const SVGO = require('svgo')

// CONFIG
const SVG_REGEX = '*.svg'

const SVGOConfig = {
  plugins: [
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    { inlineStyles: true },
    { minifyStyles: true },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      cleanupEnableBackground: true,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupNumericValues: true,
    },
    {
      moveElemsAttrsToGroup: true,
    },
    {
      moveGroupAttrsToElems: true,
    },
    {
      collapseGroups: true,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      sortAttrs: true,
    },
    {
      removeDimensions: true,
    },
    {
      removeAttrs: { attrs: '(stroke|fill)' },
    },
  ],
}

let countIcons = 0

// UTILS
const readFile = util.promisify(fs.readFile)
const mkdir = util.promisify(fs.mkdir)

// FUNCTIONS
function getIconPath() {
  let filePath = argv.path || path.resolve(__dirname, '../src/icons')
  if (filePath[0] === '~') {
    filePath = path.join(process.env.HOME, filePath.slice(1))
  }

  return path.resolve(filePath, SVG_REGEX)
}

function getIconExportPath() {
  let directory = argv.exportPath || path.resolve(__dirname, '../src/icons')
  if (directory[0] === '~') {
    directory = path.join(process.env.HOME, directory.slice(1))
  }

  return directory
}

async function createExportsDir() {
  const directory = getIconExportPath()

  try {
    fs.statSync(directory)
  } catch (e) {
    await mkdir(directory)
  }
}

async function updateIcons() {
  await createExportsDir()

  const globPath = getIconPath()
  return glob(globPath, (err, files) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    files.forEach(cleanAndRenameSVG)
  })
}

function warningIfFileIsNew(filepath) {
  try {
    if (!fs.existsSync(filepath)) {
      console.log('New icon: ', path.basename(filepath))
    }
  } catch (err) {
    console.log(err)
  }
}

async function cleanAndRenameSVG(file) {
  try {
    let content = await readFile(file, 'utf8')

    // Regexing
    // const shapeRegex = /<.*id=.*>/
    // const defsRegex = /<defs((.|\n)*)<\/defs>/
    // const gRegex = /<g((.|\n)*)<\/g>\n/
    // const [shape] = content.match(shapeRegex)
    // const [defs] = content.match(defsRegex)
    // const [g] = content.match(gRegex)

    // // Removing unwanted content
    // content = content.replace(g, '');
    // content = content.replace(defs, shape);

    // minify SVG
    const iconName = path.basename(file)
    const nextIconName = slugify(iconName, { lower: true })
    const prefix = `hsds-${nextIconName}-${countIcons++}-`

    const newconfig = {
      plugins: [
        ...SVGOConfig.plugins,
        {
          cleanupIDs: {
            prefix: prefix,
          },
        },
      ],
    }
    let svgo = new SVGO(newconfig)

    const { data } = await svgo.optimize(content)
    if (data) {
      content = data
    }

    // Save to export path
    const newFilePath = path.resolve(getIconExportPath(), nextIconName)
    warningIfFileIsNew(newFilePath)

    await fs.outputFile(newFilePath, content)
  } catch (e) {
    console.log('Error processing: ', file)
    console.log(e)
    return
  }
}

updateIcons()
