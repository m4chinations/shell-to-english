# shell-to-english
converts shell to plain english

## examples
```javascript
require('shell-to-english')('ls -art')
//list all files, sorted oldest first by modification time in the current directory
```

## how?
parses shell AST using https://github.com/grncdr/js-shell-parse. then further argument parsing is done by https://github.com/substack/minimist. 
then english generation is hard-coded with the help of https://github.com/janl/mustache.js.

see [cd.js](https://github.com/tennysonholloway/shell-to-english/blob/master/programs/cd.js) for a simple example.

## tests
`npm test` or `mocha`

## things will go wrong
things will go wrong - please file an issue with the full shell string that messed up the program. better yet, dive in and make a PR
