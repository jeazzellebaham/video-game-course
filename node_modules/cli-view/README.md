# cli-view
A Node.js module, a utility supporting cli menu and table creation to assist in creating simple cli games and apps...

cli-view wraps the popular node packages prompt and cli-table to provide a simple interface for quickly creating cli menus and tables.

##Installtion

From the command-line, execute:

    $ npm install --save cli-view

##Usage:

###Menus

Make quick menus on the fly: Here we're wrapping the prompt package:

####makeMenu

````javascript
var view = require('cli-view');

mainMenu = view.makeMenu('(s) Start game, (q) quit', /^[sq]$/);
mainMenu.on('input', onMainMenuInput);
mainMenu.show();

function onMainMenuInput(input) {
    switch (input) {
        case 'q':
            console.log('Thanks for playing Operation Spark\'s awesome game! Bye bye!');
            process.exit(0);
            break; // IDE might complain without break //
        case 's':
            start();
            break;
    }
}
````

The above menu could also be configured like so:

````javascript
var view = require('cli-view');

var mainMenu = view
        .makeMenu('(s) Start game, (q) quit', /^[sq]$/)
        .onInput('input', function (input) {
            switch (input) {
                case 'q':
                    console.log('Thanks for playing Operation Spark\'s awesome game! Bye bye!');
                    process.exit(0);
                    break;
                case 's':
                    start();
                    break;
            }
        })
        .show();
````

####makeMultiInputMenu

The `makeMultiInputMenu()` method takes an Array of configuration objects for a multi-step input.  Note the chained configuration:

````javascript
var 
    view = require('cli-view'),
    onlyAlphabet = /^[A-Za-z\s\'\"\.]+$/,
    model = require('./model'),
    people = [];

view.makeMultiInputMenu([
    {
        name: 'nameFirst', 
        validator: onlyAlphabet,
        message: 'Enter your first name',
        required: true
    },
    {
        name: 'nameLast', 
        validator: onlyAlphabet,
        message: 'Enter your last name',
        required: true
    },
    {
        name: 'username', 
        validator: onlyAlphabet,
        message: 'Enter your username',
        required: true
    }
])
.onInput(function (input) {
    person = model.makePerson(input.nameFirst, input.nameLast, input.username);
    people.push(person);
})
.show();
````

###Tables

####makeTable

Here, we're wrapping the cli-table package.  The `show()` takes an Array of Array forming columns of data.  The number of columns in the data must match the number of headers passed to the `makeTable()` method:

````javascript
var
    view = require('cli-view'),
    formattedUsers = [
    ['1', 'userOne'],
    ['2', 'userTwo']];

var table = view.makeTable(['no.:', 'username']);

/*
 * The show method takes an Array of Array forming the columns 
 * of data as string values, like the formattedUsers Array.
 */
table.show(formattedUsers);
````
