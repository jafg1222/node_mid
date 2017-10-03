'use strict'

var http = require('http').createServer(serverUpload),
    util = require('util'),
    formidable = require("formidable"),
    fse = require('fs-extra')

function serverUpload(req, res) {
    if (req.method == 'GET') {

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`
            <h2>Subiendo archivos</h2>
            <form action="/upload" enctype="multipart/form-data" method="post">
            <div><input type="file" name="upload"></div>
            <div><input type="submit" value="Subir Archivo"></div>
            </form>
            `);
    }

    if (req.method.toLowerCase() == 'post' && req.url == '/upload') {
        console.log(req.method.toLowerCase() + '  ' + req.url);

        let form = new formidable.IncomingForm();

        form
            .parse(req, (err, fields, files) => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write('<h1>Archivo subido</h1>' + util.inspect({ files: files }))
                res.end()
            })
            .on('progress', (bytesRecived, bytesExpected) => {
                let percentComplete = (bytesRecived / bytesExpected) * 100
                console.log(percentComplete)
            })
            .on('error', (err) => {
                console.log(err)
            })
            .on('end', (fields, files) => {

                let tempPath = form.openedFiles[0].path,
                    fileName = form.openedFiles[0].name,
                    newLocation = './uploadFiles/' + fileName

                fse.copy(tempPath, newLocation, (err) => {
                    return (err) ? console.log(err) : console.log('El archivo se subio con exito')
                });
            })
        return
    }
}

http.listen(3000);

console.log('server corriendo en http://localhost:3000/')