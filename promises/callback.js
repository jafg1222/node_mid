'use strict'

var fs = require('fs')
var file = './assets/name.txt',
    newFile = './assets/nombres-callback.txt'

fs.access('./assets/name.txt', fs.F_OK, (err) => {
    if (err) {
        console.log('Archivo no existe')
    } else {
        console.log('Archivo existe')
        fs.readFile(file, function(err, data) {
            if (err) {
                console.log('el archivo no se puede leer')
            } else {
                console.log('el archivo se ha leido exitosamente')
                fs.writeFile(newFile, data, (err) => {
                    return (err) ? console.log('El archivo no se pudo copiar') : console.log('El archivo se a copiado exitosamente')
                })
            }

        })
    }
});