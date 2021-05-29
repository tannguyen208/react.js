'use strict'

const environment = {
  DEV: 'development',
  TEST: 'test',
  STAG: 'staging',
  PROD: 'production',
}

environment.exist = function (value) {
  return Object.keys(environment).some(function (key) {
    return environment[key] === value
  })
}

module.exports = {
  environment,
}
