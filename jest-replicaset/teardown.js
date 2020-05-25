const debug = require('debug')('jest-mongodb:teardown')

module.exports = async function () {
  console.log('TEARDOWN CALLED!')
  debug('Teardown mongod')
  await global.__MONGOD__.stop()
}
