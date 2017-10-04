//Usando el modulo Q-Promises
'use strict'

var fs = require('fs'),
    Q = require('q'),
    file = './assets/name.txt',
    newFile = './assets/names-promises-q.txt';



function exitsFile(file) {
    let defer = Q.defer()
        /*La propiedad .defer() devuelve un objeto "diferido" con un:
                promise propiedad
                método de resolve(value)
                método de reject(reason)
                método de notify(value)
                makeNodeResolver()
        */
    fs.access(file, fs.F_OK, (err) => {
        return (err) ? defer.reject(new Error('Error accediendo al archivo')) : defer.resolve(true)
            /*
                El reject con el reason devuelve el valor por el cual la promesa no se cumplio
                El resolve devuelve el valor con la promesa cumplida
            */
    })
    return defer.promise
}

function readFile(file) {
    let defer = Q.defer()
    fs.readFile(file, (err, data) => {
        return err ? defer.reject(new Error("Archivo No Leído")) : defer.resolve(data);
    })
    return defer.promise;
}

function writeFile(file, data) {
    let defer = Q.defer()
    fs.writeFile(newFile, data, (err) => {
        return err ? defer.reject(new Error("Archivo No Copiado")) : defer.resolve("Archivo Copiado");
    })
    return defer.promise;
}

exitsFile(file)
    .then(() => { return readFile(file, dataPromise) })
    .then((dataPromise) => { return writeFile(file, dataPromise) })
    .then((dataPromise) => { return console.log(dataPromise) })
    .fail((err) => { return console.log(err.message) })