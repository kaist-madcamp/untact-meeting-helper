const path = require('path');

module.exports = {
    entry: "./src/app.ts",
    mode: "development",
    target: "node",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader",
            exclude: /node_modules/
        }]
    },
    devtool: "source-map"
}