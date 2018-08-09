const m_path = require('path');
const Scanner = require('./Scanner');

class Node {
    constructor(path) {
        /** Path of the node */
        this.path = path;

        /** Type 'file' or 'directory' */
        this.type = null;

        /** size */
        this.size = 0;

        /** fs.Stats of the node */
        this.stats = null;

        /** List of all childrean Nodes */
        this.childrean = [];
    }

    getPath() {
        return m_path.parse(this.path);
    }

    getCount() {
        return this.childrean.length;
    }

    getFileCount() {
        return this.childrean.filter(x => x.stats.isFile()).length;
    }

    getDirectoryCount() {
        return this.childrean.filter(x => x.stats.isDirectory()).length;
    }

    isFile() {
        return this.type === 'file';
    }

    isDirectory() {
        return this.type === 'directory';
    }

    getSize() {
        return this.size;
    }

    calculateSize() {
        if(this.isFile()) this.size = this.stats.size;;

        for(var i = 0; i < this.childrean.length; i++) {
            this.size += this.childrean[i].size;
        }
    }
}

module.exports = Node;