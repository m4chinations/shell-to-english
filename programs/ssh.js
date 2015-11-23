var m = require('mustache');
var directory = require('./essentials/directory');
var clean = require('./essentials/clean');

module.exports = function (ast, args) {

    var minimist = require('minimist')(args, {
        boolean : [
            '1', '2', '4', '6',
            'C',
            'f',
            'q',
            'V',
            'v',
            'X',
            'x',
        ],
        string : [
            'c',
            'E',
            'F',
            'i',
            'l',
            'p'
        ],
    }); 
};
