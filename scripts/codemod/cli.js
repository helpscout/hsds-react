/**
 * inspire by react-code-mod CLI: https://github.com/reactjs/react-codemod/blob/master/bin/cli.js
 */

// hsds-codemod optional-name-of-transform path/to/src [...options]

const globby = require('globby')
const inquirer = require('inquirer')
const meow = require('meow')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')
const isGitClean = require('is-git-clean')

const transformerDirectory = path.join(__dirname, 'transforms')

const jscodeshiftExecutable = require.resolve('jscodeshift/bin/jscodeshift.sh')

function checkGitStatus(force) {
  let clean = false
  let errorMessage = 'Unable to determine if git directory is clean'
  try {
    clean = isGitClean.sync(process.cwd())
    errorMessage = 'Git directory is not clean'
  } catch (err) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`)
    } else {
      console.log('Thank you for using hsds-react-codemods!')
      console.log(
        chalk.yellow(
          '\nBut before we continue, please stash or commit your git changes.'
        )
      )
      console.log(
        '\nYou may use the --force flag to override this safety check.'
      )
      process.exit(1)
    }
  }
}

function runTransform({ files, flags, parser, transformer, opts }) {
  const transformerPath = path.join(transformerDirectory, `${transformer}.js`)

  let args = []

  const { dry, print } = flags

  if (dry) {
    args.push('--dry')
  }
  if (print) {
    args.push('--print')
  }

  args.push('--verbose=0')

  args.push('--ignore-pattern=**/node_modules/**')

  args.push('--parser', parser)

  args.push('--extensions=jsx,js')

  args = args.concat(['--transform', transformerPath])

  // add more arguments per Transform (coming from prompt answers)
  switch (transformer) {
    case 'ReplaceImportsTransform':
      args.push('--moduleName', opts.moduleName)
      args.push('--moduleNameTarget', opts.moduleNameTarget)
      break
  }

  if (flags.jscodeshift) {
    args = args.concat(flags.jscodeshift)
  }

  args = args.concat(files)

  console.log(
    chalk.green(
      `Executing command: ${chalk.white(`jscodeshift ${args.join(' ')}`)}}`
    )
  )

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: 'inherit',
    stripEof: false,
  })

  if (result.error) {
    throw result.error
  }
}

const TRANSFORMER_INQUIRER_CHOICES = [
  {
    name: 'All: Run all codemod',
    value: 'all',
  },
  {
    name:
      '3.0 AutoDropdown: Rename AutoDropdown to SearchableDropdown and add the autoInput prop',
    value: 'AutoDropdownTransform',
  },
  {
    name:
      '3.0 AvatarGrid: Rename AvatarGrid to AvatarList, and add props center & grid',
    value: 'AvatarGridTransform',
  },
  {
    name:
      '3.0 Button: Remove the version={2} prop to Button. Rename some kind value',
    value: 'ButtonTransform',
  },
  {
    name: '3.0 ComboBox: Rename to SearchableDropdown',
    value: 'ComboBoxTransform',
  },
  {
    name: '3.0 CssVariables: Rename --BlueXXX to --HSDSXXX',
    value: 'CssVariablesTransform',
  },
  {
    name:
      '3.0 DeprecatedComponents: Add a TODO comment before each deprecated component (before both the import and the component usage)',
    value: 'DeprecatedComponentsTransform',
  },
  {
    name:
      '3.0 DropdownV2: Rename the import path to Dropdown, rename classNames when needed',
    value: 'DropdownV2Transform',
  },
  {
    name:
      '3.0 PropProvider: Add a TODO comment before PropProvider import & component usage',
    value: 'PropProviderTransform',
  },
  {
    name:
      '3.0 ReplaceImports: Replace all hsds-react import with the next release',
    value: 'ReplaceImportsTransform',
  },
  {
    name: '3.31 Button: Button standardization',
    value: 'ButtonStandardizationTransform',
  },
]

function expandFilePathsIfNeeded(filesBeforeExpansion) {
  const shouldExpandFiles = filesBeforeExpansion.some(file =>
    file.includes('*')
  )
  return shouldExpandFiles
    ? globby.sync(filesBeforeExpansion)
    : filesBeforeExpansion
}

function run() {
  const cli = meow(
    {
      description: 'Codemods for updating to HSDS-react 3.0.0',
      help: `
    Usage
      $ npx hsds-codemod <transform> <path> <...options>

        transform    Either All or a selected transform 
        path         Files or directory to transform. Can be a glob like src/**.test.js

    Options
      --force            Bypass Git safety checks and forcibly run codemods
      --dry              Dry run (no changes are made to files)
      --print            Print transformed files to your terminal

      --jscodeshift  (Advanced) Pass options directly to jscodeshift
    `,
    },
    {
      boolean: ['force', 'dry', 'print', 'help'],
      string: ['_'],
      alias: {
        h: 'help',
      },
    }
  )

  if (!cli.flags.dry) {
    checkGitStatus(cli.flags.force)
  }

  if (
    cli.input[0] &&
    !TRANSFORMER_INQUIRER_CHOICES.find(x => x.value === cli.input[0])
  ) {
    console.error('Invalid transform choice, pick one of:')
    console.error(
      TRANSFORMER_INQUIRER_CHOICES.map(x => '- ' + x.value).join('\n')
    )
    process.exit(1)
  }

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'files',
        message: 'On which files or directory should the codemods be applied?',
        when: !cli.input[1],
        default: '.',
        // validate: () =>
        filter: files => files.trim(),
      },
      {
        type: 'list',
        name: 'transformer',
        message: 'Which transform would you like to apply?',
        when: !cli.input[0],
        pageSize: TRANSFORMER_INQUIRER_CHOICES.length,
        choices: TRANSFORMER_INQUIRER_CHOICES,
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'Enter the original package name',
        when: function (answers) {
          return (
            answers.transformer === 'all' ||
            answers.transformer === 'ReplaceImportsTransform'
          )
        },
        default: '@helpscout/hsds-react',
      },
      {
        type: 'input',
        name: 'moduleNameTarget',
        message: 'Enter the new package name',
        when: function (answers) {
          const isReplaceImports =
            answers.transformer === 'all' ||
            answers.transformer === 'ReplaceImportsTransform'
          return isReplaceImports && answers.moduleName
        },
        default: 'helpscout-hsds-react-next',
      },
    ])
    .then(answers => {
      const { files, transformer, ...opts } = answers

      const filesBeforeExpansion = cli.input[1] || files
      const filesExpanded = expandFilePathsIfNeeded([filesBeforeExpansion])

      const selectedTransformer = cli.input[0] || transformer

      if (!filesExpanded.length) {
        console.log(`No files found matching ${filesBeforeExpansion.join(' ')}`)
        return null
      }

      if (selectedTransformer === 'all') {
        const allTransforms = TRANSFORMER_INQUIRER_CHOICES.map(t => {
          runTransform({
            files: filesExpanded,
            flags: cli.flags,
            parser: 'babel',
            transformer: t.value,
            opts,
          })
        })

        return Promise.all(allTransforms)
      }

      return runTransform({
        files: filesExpanded,
        flags: cli.flags,
        parser: 'babel',
        transformer: selectedTransformer,
        opts,
      })
    })
}

module.exports = {
  run: run,
  runTransform: runTransform,
  checkGitStatus: checkGitStatus,
  jscodeshiftExecutable: jscodeshiftExecutable,
  transformerDirectory: transformerDirectory,
}
