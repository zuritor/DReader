//@ts-check
'use strict';

const fs = require('fs-extra');
const mPath = require('path');
const Node = require('./Node')

class Scanner {

    constructor() {
        
    }

    /**
     * 
     * @param {String} path 
     * @param {Boolean} recursive 
     * @param {[{}]} blacklist e.g. [{name: 'node_modules', directory: true, file: false}]
     */
    async folderScan(path, recursive, blacklist = null)  {
        var root;
        
        try {
            root = fs.statSync(path);
        } catch (err) {
            throw err
        }
        
        if(!root.isDirectory()) throw new Error('Given Path is not an Folder'); // check if given path is an actual folder

        var Elements = [];
        var dirContent = null;

        // get list of all elements in a given directory path
        dirContent = await fs.readdir(path);

        for (var i = 0; i < dirContent.length; i++) {
            var node = new Node(path + '/' + dirContent[i]);
            node.stats = fs.statSync(path + '/' + dirContent[i]);
            node.type = node.stats.isFile() ? 'file' : 'directory';

            // check blacklist
            if(blacklist) {
                if(node.stats.isDirectory() && blacklist.find(x => x.name === dirContent[i] && x.directory)) continue;
                if(node.stats.isFile() && blacklist.find(x => x.name === node.getPath().name && x.file)) continue;
                if(node.stats.isFile() && blacklist.find(x => x.name === node.getPath().ext && x.extension)) continue;
            }

            if(node.stats.isDirectory() && recursive) {
                node.childrean = await this.folderScan(node.path, recursive, blacklist);
            }

            // colculate Size
            node.calculateSize();

            Elements.push(node);
        }

        return Elements;
    }
}

module.exports = new Scanner(); 