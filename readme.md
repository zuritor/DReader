DReader
=======

A simple package to get a list of files / directories with some primary information inside a directory.

## Installation

`npm install dreader --save`

## Usage

```javascript
const DReader  = require('dreader');

// to load the content of a Directory (Only loads the given directory without its subdirectories)
DReader.folderScan('path/to/directory/', false);
// to load the content of a Directory recursive
DReader.folderScan('path/to/directory/', true);

// Use a Blacklist to exclude files / directores or file extensions
var Blacklist = [
    {name: 'filename', file: true},
    {name: '.extension', extension: true},
    {name: 'directory', directory: true}
]

DReader.folderScan('path/to/directory/', true, Blacklist);
```

## Node

A Node represent a file or a directory with its childrean elements with the following Data:

* path          : contains the path of the element
* type          : contains eather 'file' or 'directory'
* size          : size of the element
* stats         : [fs.stats](https://nodejs.org/api/all.html#fs_class_fs_stats)
* chicldrean    : contains all directory elements if recursive is used
