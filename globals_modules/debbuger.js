'use strict'

const http = require('http'); // Llamando al modulo http

//Crear el server
http.createServer((request, response) => {
    // node debug nombredearchivo 
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World');
    debugger;
}).listen(1333, "localhost");

console.log('server running in http://localhost:1333/');