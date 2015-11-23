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
    ],
    'tar' : [
        ['tar', 'archive utility'],
        ['tar xvf archive.tar', 'verbosely extract all files from archive named archive.tar'],
        ['tar xvf archive.tar singleFile.png', 'verbosely extract singleFile.png from archive named archive.tar'],
        ['tar xcjf archive.tar /uploads/', 'create a new bzip2 archive named archive.tar with files: /uploads/'],
        ['tar Af archive.tar otherArchive1.tar otherArchive2.tar', 'append tar files: otherArchive1.tar, otherArchive2.tar to archive named archive.tar'],
        ['tar rgf archive.tar one.png two.png three.png', 'append files: one.png, two.png, three.png to the end of archive named archive.tar']
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
