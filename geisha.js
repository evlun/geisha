var path = require('path')
  , fs = require('fs')
  , m = module;

while (m.parent) {
  m = m.parent;
}

var base = path.join(path.dirname(m.filename), '.git')
  , head, ref, sha;

try {
  head = fs.readFileSync(path.join(base, 'HEAD')).toString();
  ref = head.match(/^ref: (.+)/);

  if (ref) {
    sha = fs.readFileSync(path.join(base, ref[1])).toString().trim();
  } else {
    sha = head.split('\n')[0].trim();
  }
} catch (err) { }

module.exports = sha;
