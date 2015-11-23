var m = require('mustache');
var directory = require('./essentials/directory');

var template = "change the current working directory to {{dir}}{{#args}}, {{.}}{{/args}}";
m.parse(template);

module.exports = function(ast, args) {  
    
    var minimist = require('minimist')(args, {
        boolean : ['L', 'P']
    });

    var data = {
        dir : function() {
            if (!minimist._.length) {
                return "the home directory";
            } else {
                return directory(minimist._); 
            }
        },
        args : function() {
            var list = [];

            if (minimist.L) {
                list.push("following symbolic links");
            } else if (minimist.P) {
                list.push("without following symbolic links");
            }

            return list.length > 0 ? list : false;
        }
    };

    return m.render(template, data).trim();
};

