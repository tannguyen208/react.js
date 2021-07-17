const fs = require('fs-extra')
const paths = require('../config/paths')
const chalk = require('react-dev-utils/chalk')

fs.emptyDirSync(paths.appBuild)
console.log(chalk.green('✅ Cleaned successfully.\n'))
