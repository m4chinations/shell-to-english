var parse = require('./parse.js');
var argv = process.argv.slice(2).join(' ');

console.log(parse(argv));
