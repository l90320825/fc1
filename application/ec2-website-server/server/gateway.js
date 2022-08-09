const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');

const app = express();
const appServer = server.createServer(app);
const appProxy = httpProxy.createProxyServer(app);

//Runs with: 
//node gateway.js - from this folder
//this redirects you from open port 80 to port 3000 where react app is
//react app also needs to be started
appProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy down :(');
});

const fronEndHost = process.env.FRONT_END_HOST || 'http://localhost:3000';


app.all('/api*', (req, res) => {
  const options = {
      target: 'http://localhost:4000'
  };
  appProxy.web(req, res, options);
});

app.all('/*', (req, res) => {
  appProxy.web(req, res, { target: fronEndHost });
});

appServer.listen(80);
console.log('Gateway started');