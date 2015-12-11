var m = require('mustache');
var directory = require('./essentials/directory');
var clean = require('./essentials/clean');

var template = "{{background}} {{verbosity}} log into {{host}} {{port}} {{user}} {{ipv}} {{x11}} {{protocol}} {{&config}} {{&log}} {{cipher}} {{compression}} {{&execute}}";
m.parse(template);


module.exports = function (ast, args) {

    /* use minimist once to get the host, then strip the execution from args
     * then use minimist again so not to parse any args in the execution command 
     *
     * this is to prevent 
     * `ssh server ls -alh` from having the ls -alh being parsed as ssh flags
     * */

    var minimist = require('minimist')(args, {
        boolean : [
            '1', '2', '4', '6', /* protocol and ipv4/6 flags */
            'C', /* requests compression of all data */
            'f', /* requests ssh to go to background just before cmd execution */
            'q', /* quiet mode */
            'V', /* display the version number and exit */
            'v', /* verbose mode */
            'vv', /* very verbose */
            'vvv', /* Kreygasm verbose */
            'X', /* enable X11 forwarding */
            'x', /* disable X11 forwarding */
        ],
        string : [
            'c', /* selects the cipher spec */
            'E', /* selects the log file */
            'F', /* selects the config file */
            'i', /* select the identifiy file */
            'l', /* selects the login name */
            'p' /* selects the port */
        ],
    }); 
    
    var execution = "";
    var newArgs = args;

    if (minimist._.length > 1) { /* there are execution commands */
        var executionIdx = args.indexOf(minimist._[1]);
        var argsCopy = args.slice(); /* make a copy of args */

        argsCopy = argsCopy.slice(executionIdx, argsCopy.length);

        execution = argsCopy.join(' ');

        newArgs = args.slice(0, executionIdx);
    }

    minimist = require('minimist')(newArgs, {
        boolean : [
            '1', '2', '4', '6', /* protocol and ipv4/6 flags */
            'C', /* requests compression of all data */
            'f', /* requests ssh to go to background just before cmd execution */
            'q', /* quiet mode */
            'V', /* display the version number and exit */
            'v', /* verbose mode */
            'vv', /* very verbose */
            'vvv', /* Kreygasm verbose */
            'X', /* enable X11 forwarding */
            'x', /* disable X11 forwarding */
        ],
        string : [
            'c', /* selects the cipher spec */
            'E', /* selects the log file */
            'F', /* selects the config file */
            'i', /* select the identifiy file */
            'l', /* selects the login name */
            'p' /* selects the port */
        ],
    }); 


    if (minimist.V) { /* display the version number and exit */
        return "display the ssh version";
    } 

    if (minimist._.length === 0) { /* partial input */
        return "log into";
    }

    var data = {
        verbosity : function() {
            if (minimist.v) {
                return "verbosely";
            } else if (minimist.vv) {
                return "very verbosely";
            } else if (minimist.vvv) {
                return "very, very verbosely";
            } else if (minimist.q) {
                return "quietly";
            } else {
                return "";
            }
        },
        background : function() {
            if (minimist.f) {
                return "in the background";
            } else {
                return "";
            }
        },
        server : function() {
            
        },
        user : function() {
            if (minimist.l) { /* if user is given through -l */
                return "as " + minimist.l + ", ";
            } else if (minimist._[0].indexOf('@') > -1) { /* else if it's combined with host with @ */
                return "as " +minimist._[0].slice(0, minimist._[0].indexOf('@')) + ", ";
            } else { /* else they're logging in with an ssh identify */
                return "using your identify file, ";
            }
        },
        host : function() {
            if (minimist._[0].indexOf('@') > -1) { /* if user@host format */
                return minimist._[0].slice(minimist._[0].indexOf('@') + 1, minimist._[0].length);
            } else { /* else using identifiy... e.g. `ssh dev` */
                return minimist._[0];
            }
        },
        port : function() {
            if (minimist.p) {
                return "on port " + minimist.p;
            } else {
                return "";
            }
        },
        ipv : function() {
            if (minimist['4']) {
                return "using ipv4 only, ";
            } else if (minimist['6']) {
                return "using ipv6 only, ";
            } else {
                return "";
            }
        },
        x11 : function() {
            if (minimist.X) {
                return "using X11 forwarding, ";
            } else if (minimist.x) {
                return "not using X11 forwarding, ";
            } else {
                return "";
            }
        },
        protocol : function() {
            if (minimist['1']) {
                return "using only protocol version 1, ";
            } else if (minimist['2']) {
                return "using only protocol version 2, ";
            } else {
                return "";
            }
        }, 
        config : function() {
            if (minimist.F) {
                return "using config file " + minimistF + ", ";
            } else {
                return "";
            }
        },
        log : function() {
            if (minimist.E) {
                return "logging to " + minimist.E + ", ";
            } else {
                return "";
            }
        },
        cipher : function() {
            if (minimist.c && minimist['1']) {
                return "using cipher spec " + minimist.c + ", ";
            } else if (minimist.c && minimist['2']) {
                return "attempting to use cipher spec(s) " +  minimist.c + ", ";
            } else {
                return "";
            }
        },
        compression : function() {
            if (minimist.C) {
                return "requesting that all data be compressed, ";
            } else {
                return "";
            }
        },
        execute : "and execute: " + execution
    };

    return clean(m.render(template, data));
     
};
