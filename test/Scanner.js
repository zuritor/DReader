//@ts-check
'use strict';

const assert                        = require('chai').assert;
const Scanner                       = require('../lib/Scanner');
//@ts-ignore
const pkg                           = require('../package');

describe(`${pkg.name}/Client`, function() {

    this.timeout(10000);

    describe('#Scanner', function() {

        it('check test folder content', async function() {
            var result = await Scanner.folderScan('./test', false);
            
            assert.equal(result.length, 2, 'Should be two Elements in the test Folder (Folder, Scanner.js)');
            assert.isTrue(result[0].isDirectory(), 'First Element should be a Folder');
            assert.equal(result[0].getPath().name, 'Folder', 'The Name of the first Element should be Folder');
            assert.equal(result[0].getCount(), 0, 'There should no children loaded because recursive is set to false for this scanner')
            assert.equal(result[0].getFileCount(), 0, 'There should no children loaded because recursive is set to false for this scanner')
            assert.equal(result[0].getDirectoryCount(), 0, 'There should no children loaded because recursive is set to false for this scanner')
        })

        it('check test folder content with recursive', async function() {
            var result = await Scanner.folderScan('./test', true);
            
            assert.equal(result.length, 2, 'Should be two Elements in the test Folder (Folder, Scanner.js)');
            assert.isTrue(result[0].isDirectory(), 'First Element should be a Folder');
            assert.equal(result[0].getPath().name, 'Folder', 'The Name of the first Element should be Folder');
            assert.equal(result[0].getCount(), 1, 'There should be one Element in the Folder Folder')
            assert.equal(result[0].getFileCount(), 1, 'There should be one file inside')
            assert.equal(result[0].getDirectoryCount(), 0, 'There should be no folder inside')
        })

        it('check test folder content with blacklist By Directory Name', async function() {
            var result = await Scanner.folderScan('./test', true, [{name: 'Folder', directory: true}]);
            
            assert.equal(result.length, 1, 'Should be two Elements in the test Folder (Scanner.js)');
            assert.isTrue(result[0].isFile(), 'First Element should be a File');
            assert.equal(result[0].getPath().name, 'Scanner', 'The Name of the first Element should be file');
        })

        it('check test folder content with blacklist By File Name', async function() {
            var result = await Scanner.folderScan('./test', true, [{name: 'file', file: true}]);
            
            assert.equal(result.length, 2, 'Should be two Elements in the test Folder (Scanner.js)');
            assert.isTrue(result[0].isDirectory(), 'First Element should be a Folder');
            assert.equal(result[0].getCount(), 0, 'There should be no Elements in the Folder Folder')
        })

        it('check test folder content with blacklist By Extension Name', async function() {
            var result = await Scanner.folderScan('./test', true, [{name: '.js', extension: true}]);
            
            assert.equal(result.length, 1, 'Should be two Elements in the test Folder (Scanner.js)');
            assert.isTrue(result[0].isDirectory(), 'First Element should be a Folder');
            assert.equal(result[0].getCount(), 0, 'There should be no Elements in the Folder Folder');
        })

        it('check if size is != 0', async function() {
            var result = await Scanner.folderScan('./test', true);
            
            assert.equal(result.length, 2, 'Should be two Elements in the test Folder (Scanner.js)');
            assert.isTrue(result[0].isDirectory(), 'First Element should be a Folder');
            assert.equal(result[0].getCount(), 1, 'There should be one Element in the Folder Folder');
            assert.isAbove(result[0].getSize(), 0, 'Folder size should be grater than 0');
            assert.isAbove(result[1].getSize(), 0, 'File size should be grater than 0');
        })
        
        it('Wrong Name to a file / Directory', async function() {
            try {
                var result = await Scanner.folderScan('File', true);

                assert.isTrue(false);
            } catch (error) {
                assert.equal(error.message, 'ENOENT: no such file or directory, stat \'File\'', 'no such file or directory');
            }
        })

        it('Wrong Name to a file and not a Directory', async function() {
            try {
                var result = await Scanner.folderScan('index.js', true);

                assert.isTrue(false);
            } catch (error) {
                assert.equal(error.message, 'Given Path is not an Folder', 'There should be an error that the path is not to an directory')
            }
        })
    })
});