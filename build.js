// Smart Funge build tools

const fs = require('fs');
const path = require('path');
const uglify = require("uglify-js");

console.log('Smart Funge Build Tools');
console.log('Building...');
console.log('');

function getFormattedTime() {
    const now = new Date();

    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-11
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${month}/${day}/${year}:${hours}:${minutes}:${seconds}`;
}

// comment
const comment = 'Smart Funge IDE\nBuilt on ' + getFormattedTime();

// make sure theres a build folder
fs.mkdir('./build', {recursive: true}, () => {});

// build assets
const assetsPath = './src/assets/';
(function() {
    let files;
    try {
        files = fs.readdirSync(assetsPath);
    } catch (e) {
        console.error('Could not build assets: error reading directory');
        console.log('');
        return;
    }

    console.log('Building assets...')
    
    // assets.js file content
    let buildResult = 'const assets={';

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
})();

// build javascript
const jsPath = './src/js';
(function() {
    console.log('Building js...')

    let files;
    try {
        files = fs.readdirSync(jsPath);
    } catch (e) {
        console.error('Could not build js: error reading directory');
        console.log('');
        return;
    }
    
    // bundle.js file content
    let buildResult = '';

    for (let i=0; i<files.length; i++) {
        let fileName = path.join(jsPath, files[i]);

        // make sure its a file
        if (!fs.statSync(fileName).isFile()) continue;
        
        let string;
        // get the file contents
        try {
            string = fs.readFileSync(fileName, {encoding: 'utf8'});
        } catch (e) {
            console.error('Could not read file \'' + files[i] + '\'');
            continue;
        }

        // add this file to build result
        buildResult += '\n' + string + '\n';

        console.log('Built file \'' + files[i] + '\'');
    }

    // minify
    const minified = uglify.minify(buildResult);
    if (minified.error) {
        console.error('Could not build js: minifier error: ' + minified.error);
    }
    buildResult = minified.code;
        
    // write build results
    fs.writeFileSync('./build/bundle.js', buildResult);

    console.log('Built js (result in ./build/bundle.js)');
    console.log('');
})();

// build HTML client
(function() {
    console.log('Building client...');

    let assetsString, jsString;
    try {
        assetsString = fs.readFileSync('./build/assets.js', {encoding:'utf8'});
        jsString = fs.readFileSync('./build/bundle.js', {encoding:'utf8'});
    } catch (e) {
        console.error('Could not build client: error reading files');
        console.log('');
        return;
    }

    let html = `<!-- ${comment} -->
<!DOCTYPE html><html><head>
<title>Loading...</title>
<script>
${assetsString}
</script>
<script>
${jsString}
</script>
</head><body></body></html>`

    fs.writeFileSync('./build/client.html', html);

    console.log('Built client (result in ./build/client.html)');
    console.log('');
})();