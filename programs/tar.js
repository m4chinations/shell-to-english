var m = require('mustache');
var directory = require('./essentials/directory');
var clean = require('./essentials/clean');

module.exports = function(ast, args) {

    /* partial input */
    if (!args[0]) {
        return "archive utility";
    }

    /* tar flags don't require a -, so add one to help minimist
     * flag the flags correctly */
    if (args[0] && args[0].slice(0, 1) !== '-') {
        args[0] = '-' + args[0];
    }

    /* parse tar args using minimist */
    var minimist = require('minimist')(args, {
        boolean : [
            'c', 'create',
            't', 'list',
            'v', 'verbose',
            'r', 'append',
            'x', 'extract', 'get',
            'A', 'catenate', 'concatenate',
            'j', 'bzip2',
            'z', 'gzip'
        ],
        string : [
            'C', 'directory',
            'f', 'file'
        ]
    });
    
    /* tar is 10 programs in one, so generate the template based on
     * some flags */
    var template = "";

    if (minimist.c || minimist.create) {
        template = "{{v}} create a new {{comp}} archive named {{&archive}} with files: {{&files}}";
    } else if (minimist.A || minimist.catenate || minimist.concatenate) {
        template = "{{v}} append tar files: {{&files}} to {{comp}} archive named {{&archive}}";
    } else if (minimist.t || minimist.list) {
        template = "{{v}} list all files in {{comp}} archive named {{&archive}}";
    } else if (minimist.x || minimist.extract || minimist.get) {
        template = "{{v}} extract {{&xfiles}} from {{comp}} archive named {{&archive}}";
    } else if (minimist.r || minimist.append) {
        template = "{{v}} append files: {{&files}} to the end of {{comp}} archive named {{&archive}}";
    }

    var data = {
        comp : function() {
            if (minimist.j || minimist.bzip2) {
                return "bzip2";
            } else if (minimist.z || minimist.gzip) {
                return "gzip";
            } else {
                return "";
            }
        },
        v : (minimist.v || minimist.verbose) ? "verbosely" : "",
        archive : function() {
            var archive = minimist.f;
            return archive;
        },
        xfiles : function () { /* individual file extraction e.g. -xvf archive.tar oneFile.png */
            if (minimist._.length === 0) {
                return "all files";
            } else {
                var files = "";
                minimist._.forEach(function(element, index) {
                    if (index === minimist._.length - 1)
                        files = files + element;
                    else
                        files = files + element + ", ";

                });
                return files;
            }
        },
        files : function () {
            var files = "";

            minimist._.forEach(function(element, index) {
                if (index === minimist._.length - 1)
                    files = files + element;
                else
                    files = files + element + ", ";

            });

            return files;
        }
    };

    return clean(m.render(template, data));


};
