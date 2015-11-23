var m = require('mustache');
var directory = require('./essentials/directory');
var clean = require('./essentials/clean');

var template = "list {{hidden}} files {{args}} in {{&dir}}";
m.parse(template);

module.exports = function(ast, args) {  
    
    var minimist = require('minimist')(args, {
        boolean : [
            'a', 'all', 
            'l', 
            'r', 
            'h', 'human-readable',
            't'
        ]
    });

    var data = {
        hidden : function() {
            if (minimist.a || minimist.all) {
                return "all";
            } else {
                return "non-hidden";
            }
        },
        args : function() {
            var nounPhrases = [];
            var prepositions = [];

            if (minimist.l) {
                nounPhrases.push("a long listing format");
            }
            if (minimist.r && !minimist.t) {
                nounPhrases.push("a reversed order");
            }
            if (minimist.h || minimist['human-readable']) {
                nounPhrases.push("human readable filesizes");
            }
            if (minimist.t && minimist.r) {
                prepositions.push("sorted oldest first by modification time");
            }
            if (minimist.t && !minimist.r) {
                prepositions.push("sorted newest first by modification time");
            }

            var str = '';
            if (nounPhrases.length > 0) {
                str = str + " with ";
                nounPhrases.forEach(function(element, index) {
                    if (index === nounPhrases.length - 1) {
                        str = str + element;
                    } else {
                        str = str + element + " and ";
                    }
                });
            }
            if (prepositions.length > 0) {
                str = str + ', ';
                prepositions.forEach(function(element, index) {
                    if (index === prepositions.length - 1) {
                        str = str + element;
                    } else {
                        str = str + element + " and ";
                    }
                });
            } 
            return str;
        },
        dir : function() {
            if (!minimist._.length) {
                return "the current directory";
            } else if (minimist._.length === 1) {
                return directory(minimist._[0]); 
            } else if (minimist._.length > 1) {
                var str = "";
                minimist._.forEach(function(element, index) {
                    if (index === minimist._.length - 1) {
                        str = str + directory(minimist._[index]);
                    } else {
                        str = str + directory(minimist._[index]) + " and ";
                    }
                });
                return str;
            }
        }
    };

    return clean(m.render(template, data));
};

