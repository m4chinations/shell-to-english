var shell_parse = require('shell-parse');


module.exports = function (shell_string) {
    var ast = shell_parse(shell_string);
    var output = "";
    ast.forEach(function(element, index) {
        if (element.type === 'command') {
            if (element.command.type == 'literal') {
                try {
                    var cmd = require('./programs/'+element.command.value);
                    var args = [];
                    element.args.forEach(function(arg, index) {
                        args.push(arg.value);
                    });
                    output = cmd(ast, args);
                } catch (e) {
                    console.log(e);
                    console.log("parser for command not found");
                }
            }
        }
    });
    return output;
};

