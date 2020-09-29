'use strict';

var
    Table = require('cli-table'),
    prmpt = require("prompt"),
    deepExtend = require('deep-extend'),
    EventEmitter = require('events').EventEmitter;
    
/*
 * For our purposes, kill the default prompt message and delimiter.
 */
prmpt.message = '';
prmpt.delimiter = '';

/**
 * makeMenu A factory that returns a menu object capable of prompting a user 
 *      for input. On input, the menu dispatches the 'input' event along with the input.
 * @param {String} message The menu selection text to be shown to the user, 
 *      usually someting like (1) Show, (2) Add, (q) Quit:.
 * @param {RegEx} validator A regular expression to validate user input.
 * @param {String} warning The warning message displayed to the user if their 
 *      input is invalid.

 * @extends {events.EventEmitter}
 */
function makeMenu(message, validator, warning) {
    var menuProperties = [
        {
          name: 'input', 
          required: true,
          message: message,
          validator: validator,
          warning: warning
        }
    ];
    
    var _menu = {
        show: function() {
            // just in case we haven't used the prompt before //
            prmpt.start();
            prmpt.get(menuProperties, function (err, result) {
                if (err) { return onErr(err); }
                _menu.emit('input', result.input);
            });
            return _menu;
        },
        
        onInputOnce: function (callback) {
            _menu.once('input', callback);
            return _menu;
        },
        
        onInput: function (callback) {
            _menu.on('input', callback);
            return _menu;
        }
    };
    deepExtend(_menu, new EventEmitter());
    return _menu;
}
module.exports.makeMenu = makeMenu;


/**
 * makeMultiInputMenu A factory that returns a menu object capable of prompting 
 *      a user for multi step input. Once all input steps are complete, the 
 *      menu dispatches the 'input' event along with the input.
 * @param {Array} properties Based on the original prompt API, takes an Array of 
 *      configuration objects, key value pairs representing the input step.

 * @extends {events.EventEmitter}
 */
function makeMultiInputMenu(properties) {
    var _menu = {
        properties: properties,
        
        show: function() {
            // just in case we haven't used the prompt before //
            prmpt.start();
            prmpt.get(properties, function (err, input) {
                    if (err) return onErr(err);
                    _menu.emit('input', input);
            });
            return _menu;
        },
        
        onInputOnce: function (callback) {
            _menu.once('input', callback);
            return _menu;
        },
        
        onInput: function (callback) {
            _menu.on('input', callback);
            return _menu;
        }
    };
    deepExtend(_menu, new EventEmitter());
    return _menu;
}
module.exports.makeMultiInputMenu = makeMultiInputMenu;

function makeTable(headers) {
    var _table = {
        show: function(values) {
            var table = createFormattedTable(headers);
            table.push.apply(table, values);
            console.log(table.toString());
            return _table;
        }
    };
    return _table;
}
module.exports.makeTable = makeTable;


/**
 * A private utility function that creates and returns a table 
 * object formatted with the given Array of String as headers.
 */
function createFormattedTable (headers) {
    var chars = {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
        'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚',
        'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─',
        'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│'
    };
    
    return new Table({
        head: headers,
        chars: chars
    });
}

function onErr(err) {
    console.log(err);
    return 1;
}
