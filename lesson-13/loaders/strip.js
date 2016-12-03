var stripComments = require('strip-json-comments');

module.exports = function(source) {
  // tell webpack that this loader is deterministic
  // given same inputs, it produces same output.
  // don't set it if using guid, timestamp etc.
  // improves performance, webpack doesn't need to run loader twice if
  // called on same input
  this.cacheable();

  console.log('source', source);

  var result = stripComments(source)

  console.log('result', result);

  // return results of stripping out json from input source
  return result;
}
