var path = require('path');
var commonConfig = require('./webpack.common.config');

var output = {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'https://swenson.github.io/zelda-randomizer-helper/build/',
    filename: 'bundle.js'
};

module.exports = Object.assign(commonConfig, {
    output: output
});
