module.exports = function (options) {
  const errorHandler = require('../errorHandler')(options)

  return function ensureContentType (req, res, next) {
    const ct = req.headers['content-type']

    if (!ct) {
      return errorHandler(req, res, next)(new Error('missing_content_type'))
    }

    if (ct.indexOf('application/json') === -1 && 
      (ct.indexOf('application/json-patch+json') === -1 || req.method !== 'PATCH')) {
      return errorHandler(req, res, next)(new Error('invalid_content_type'))
    }

    next()
  }
}
