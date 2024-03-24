'use strict'

module.exports = function isObjectLike (value) {
  return (typeof value === 'object' || typeof value === 'function') && value !== null
}
