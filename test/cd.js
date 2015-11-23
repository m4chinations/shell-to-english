var should = require('should');
var parse = require('../parse');

var programs = {
    'cd' : [
        ['cd', 'change the current working directory to the home directory'],
        ['cd test', 'change the current working directory to the test directory']
    ],
    'ls' : [
        ['ls', 'list non-hidden files in the current directory'],
        ['ls -alh', 'list all files with a long listing format and human readable filesizes in the current directory'],
        ['ls -alhrt', 'list all files with a long listing format and human readable filesizes, sorted oldest first by modification time in the current directory']
    ]
};

Object.keys(programs).forEach(function(key) {
    describe(key, function() {
        programs[key].forEach(function (element) {
            it('`' + element[0] + '` === \'' + element[1] +'\'', function() {
                parse(element[0]).should.be.equal(element[1]);
            });
        });
    });
});
