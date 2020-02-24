const express = require('express');
const getFnList = require("./utility/readConfig");

const app = express();
const PORT = process.env.PORT || 7777;

const handler = (func, req) => {
    return new Promise(async resolver => {
        const result = func(req);
        resolver(result);
    })
};

const mockRequestProps = req => {
    req.queryStringParameters = req.query;
    req.httpMethod = req.method;
    return req;
};


const functions = getFnList('./app/serverless.yml');

for (const item of functions) {
    const [file, func] = item.name.split('.');
    const jsFile = require(`./app/${file}.js`);
    const fn =  jsFile[func];
    const endpoint = item.endpoint;
    console.log('🔧 Setting up endpoint ', endpoint);
    app.get(endpoint, async (req, res) => {
        mockRequestProps(req);
        const response = await handler(fn, req);
        res.send(response.body);
    })
}

console.log(`\n🚀 Server is ready on port ${PORT}`);
app.listen(PORT);
