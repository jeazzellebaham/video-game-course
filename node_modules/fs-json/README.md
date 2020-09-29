An fs module wrapper to support filesystem json operations.

##Installation

    $ npm install --save fs-json

##Usage:

````javascript
// NOTE : closure init //
fsjson = require('fs-json')();

// sync //
var data = jsonUtil.loadSync('path/to/file.json');

// async //
var data = jsonUtil.load('path/to/file.json', function(data) {
    console.log(data);
});
````
