'use strict';
var fs = require('fs'),
JSONStream = require('JSONStream');

module.exports = async function readjson(X1,X2) {
    
    // const readFilePromise = (XX) => {
        //const first = new Promise((resolve, reject) => {
        return new Promise((resolve, reject) => {
            var results = []
        
            var stream = fs.createReadStream('config.json', {encoding: 'utf8'}),
            parser = JSONStream.parse(`${X1}.*.${X2}`)
    
    
            stream.pipe(parser);
    
                    parser.on('data', (data) => results.push(data))
                    parser.on('end', () => {
                        resolve(results)
                    }).on('error', () => {
                    reject("Unable to read file")
                })
          })
        
        //}

}