// @ts-check
const __env__ = require('../config/enum').environment

const modeBuilder = process.argv.find((arg) => arg.startsWith('--mode='))
if (
  !modeBuilder ||
  (modeBuilder && !__env__.exist(modeBuilder.replace('--mode=', '')))
) {
  console.log(`
    🐞🐞🐞 Build Error 🐞🐞🐞
    Message: Please adding for command line --mode=<mode_enums> (config/enum.js)
  `)
  process.exit(1)
}

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = __env__.PROD
process.env.NODE_ENV = __env__.PROD
process.env.NODE_ENV_BUILDER = modeBuilder.replace('--mode=', '')

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const path = require('path')
// @ts-ignore
const chalk = require('react-dev-utils/chalk')
const fs = require('fs-extra')
// @ts-ignore
const bfj = require('bfj')
const webpack = require('webpack')
const configFactory = require('../config/webpack.config')
const paths = require('../config/paths')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const printHostingInstructions = require('react-dev-utils/printHostingInstructions')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const printBuildError = require('react-dev-utils/printBuildError')

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild
const useYarn = fs.existsSync(paths.yarnLockFile)

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

const argv = process.argv.slice(2)
const writeStatsJson = argv.indexOf('--stats') !== -1

// Generate configuration
const config = configFactory(__env__.PROD)

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
// @ts-ignore
const {checkBrowsers} = require('react-dev-utils/browsersHelper')
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // First, read the current file sizes in build directory.
    // This lets us display how much they changed later.
    return measureFileSizesBeforeBuild(paths.appBuild)
  })
  .then((previousFileSizes) => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild)
    // Merge with the public folder
    copyPublicFolder()
    // Start the webpack build
    return build(previousFileSizes)
  })
  .then(
    ({stats, previousFileSizes, warnings}) => {
      console.log('♎ ~ previousFileSizes', previousFileSizes)
      if (warnings.length) {
        // @ts-ignore
        console.log(chalk.yellow('Compiled with warnings.\n'))
        console.log(warnings.join('\n\n'))
        console.log(
          '\nSearch for the ' +
            // @ts-ignore
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        )
        console.log(
          'To ignore, add ' +
            // @ts-ignore
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        )
      } else {
        // @ts-ignore
        console.log(chalk.green('Compiled successfully.\n'))
      }

      console.log('File sizes after gzip:\n')
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      )
      console.log()

      const appPackage = require(paths.appPackageJson)
      const publicUrl = paths.publicUrlOrPath
      const publicPath = config.output.publicPath
      const buildFolder = path.relative(process.cwd(), paths.appBuild)
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      )
    },
    (err) => {
      const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true'
      if (tscCompileOnError) {
        console.log(
          // @ts-ignore
          chalk.yellow(
            'Compiled with the following type errors (you may want to check these before deploying your app):\n'
          )
        )
        printBuildError(err)
      } else {
        // @ts-ignore
        console.log(chalk.red('Failed to compile.\n'))
        printBuildError(err)
        process.exit(1)
      }
    }
  )
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...')

  // @ts-ignore
  const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages
      if (err) {
        if (!err.message) {
          return reject(err)
        }

        let errMessage = err.message

        // Add additional information for postcss errors
        if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
          errMessage +=
            '\nCompileError: Begins at CSS selector ' +
            err['postcssNode'].selector
        }

        // @ts-ignore
        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: [],
        })
      } else {
        messages = formatWebpackMessages(
          stats.toJson({all: false, warnings: true, errors: true})
        )
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          // @ts-ignore
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        )
        return reject(new Error(messages.warnings.join('\n\n')))
      }

      const resolveArgs = {
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      }

      if (writeStatsJson) {
        return bfj
          .write(paths.appBuild + '/bundle-stats.json', stats.toJson())
          .then(() => resolve(resolveArgs))
          .catch((error) => reject(new Error(error)))
      }

      return resolve(resolveArgs)
    })
  })
}

function copyPublicFolder() {
  const ignoredFiles = [
    // files will be ignored when building a project
    paths.appHtml,
    paths.appMockService,
  ]

  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => !ignoredFiles.some((f) => f === file),
  })
}
