const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();

app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:3000',
    pathRewrite: {
        "^/api": ""
    }
}));

const bundler = new Bundler('./src/app/index.html');
app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));