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

    console.log('Building assets...')
    
    // assets.js file content
    let buildResult = 'export default {';

    for (let i=0; i<files.length; i++) {
        let fileName = path.join(assetsPath, files[i]);

        // make sure its a file
        if (!fs.statSync(fileName).isFile()) continue;
        
        let buffer;
        // get the file contents
        try {
            buffer = fs.readFileSync(fileName);
        } catch (e) {
            console.error('Could not read file \'' + files[i] + '\'');
            continue;
        }

        // encode to base64
        const encoded = buffer.toString('base64');

        // add this file to build result
        buildResult += '"' + files[i].replaceAll('"', '\\"') + '":"' + encoded + '",';

        console.log('Built file \'' + files[i] + '\'');
    }
    
    // end the object
    buildResult += '}';
        
    // write build results
    fs.writeFileSync('./build/assets.js', buildResult);

    console.log('Built assets (result in ./build/assets.js)');
    console.log('');
})