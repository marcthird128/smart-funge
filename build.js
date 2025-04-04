// Smart Funge build tools

const fs = require('fs');
const path = require('path');

console.log('Smart Funge Build Tools');
console.log('Building...');
console.log('');

// make sure theres a build folder
fs.mkdir('./build', {recursive: true}, () => {});

// build assets
const assetsPath = './src/assets/';
fs.readdir(assetsPath, (err, files) => {
    if (err) {
        console.error('Could not build assets: error reading directory');
        return;
    }
    
    // assets.js file content
    let buildResult = 'export {';

    for (let i=0; i<files.length; i++) {
        let fileName = path.join(assetsPath, files[i]);
        if (!fs.statSync(fileName).isFile()) continue;
        
        fs.readFile(fileName, (err, buffer) => {
            if (err) {
                console.error('Could not read file \'' + fileName + '\'');
                return;
            }

            // encode to base64
            const encoded = buffer.toString('base64');

            // add this file to build result
            buildResult += '"' + fileName.replaceAll('"', '\\"') + '":"' + encoded + '",';
        });
    }

    buildResult += '}';

    // write build results
    fs.writeFile('./build/assets.js', buildResult, () => {
        console.log('Built assets (result in ./build.assets.js)');
    });
})