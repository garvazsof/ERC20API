'use strict'
var express = require("express");
var router = express.Router();
var config = require("../config");
var Web3 = require("web3");
var net = require('net');
var ethers = require('ethers');

var ethProvider = new ethers.providers.InfuraProvider("ropsten","79f3534c6c384e52855ac864d523db3b");

// -----------------------------------
//wallet para transacciones
var wallet = new ethers.Wallet(config.ethereum.privateKey,ethProvider);
var contract_sign = new ethers.Contract(config.ethereum.contractAddress, config.ethereum.abi, wallet);

//web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/79f3534c6c384e52855ac864d523db3b"));

router.post("/cursos/registraAlumno", function(req, res) {
    var results = [];

    try{    

        var matricula = req.body.matricula;
        var nombre = req.body.nombre;
        var campus = req.body.campus;
        var grupo = req.body.grupo;

        console.log(matricula);
        console.log(nombre);
        console.log(campus);
        console.log(grupo);

        var sendPromise = contract_sign.registrarAlumno(ethers.utils.bigNumberify(matricula),nombre,campus,grupo);

        sendPromise.then(function(transaction){
            results.push({
                result: "OK",
                tx_hash: transaction.hash
            });
            console.log('Alumno registrado' + transaction.hash);
            res.status(200).send(results); 
        }); 

        //res.status(200).send('Cursos API - registra alumno'); 
    } 
    catch(error)
    {
        results.push({
            result: "ERROR",
            error: error
        });
        console.log(error);
        res.status(500).send(results); 
    }

});

router.post("/cursos/modificaPuntos", function(req, res) {
    var results = [];

    try{    

        var matricula = req.body.matricula;
        var puntos = req.body.puntos;

        console.log(matricula);
        console.log(puntos);

        var sendPromise = contract_sign.modificaPuntos(matricula,ethers.utils.bigNumberify(puntos));

        sendPromise.then(function(transaction){
            results.push({
                result: "OK",
                tx_hash: transaction.hash
            });
            console.log('Puntos modificados ' + transaction.hash);
            res.status(200).send(results); 
        }); 

        //res.status(200).send('Cursos API - registra alumno'); 
    } 
    catch(error)
    {
        results.push({
            result: "ERROR",
            error: error
        });
        console.log(error);
        res.status(500).send(results); 
    }

});

router.post("/cursos/modificaCurso", function(req, res) {
    var results = [];

    try{    

        var curso = req.body.curso;

        console.log(curso);

        var sendPromise = contract_sign.modificaCurso(curso);

        sendPromise.then(function(transaction){
            results.push({
                result: "OK",
                tx_hash: transaction.hash
            });
            console.log('Curso modificado ' + transaction.hash);
            res.status(200).send(results); 
        }); 

        //res.status(200).send('Cursos API - registra alumno'); 
    } 
    catch(error)
    {
        results.push({
            result: "ERROR",
            error: error
        });
        console.log(error);
        res.status(500).send(results); 
    }

});

router.post("/cursos/getPuntos", function(req, res) {

    try{    

        var matricula = req.body.matricula;

        console.log(matricula);

        var sendPromise = contract_sign.getPuntos(matricula);

        sendPromise.then(function(result){
            console.log('El saldo de puntos es: ' + result.toString());
            res.status(200).send(result.toString()); 
        }); 

        //res.status(200).send('Cursos API - registra alumno'); 
    } 
    catch(error)
    {
        console.log(error);
        res.status(500).send(error); 
    }

});

router.get("/cursos/getCurso", function(req, res) {
    
    var callPromise = contract_sign.getCurso();

    callPromise.then(function(result){
        console.log(result.toString());
        res.status(200).send(result.toString()); 
    });
    
    //res.status(200).send('Curso API - obtener curso'); 

});

router.get("/cursos/getProfesor", function(req, res) {
    
    var callPromise = contract_sign.getProfesor();

    callPromise.then(function(result){
        console.log(result.toString());
        res.status(200).send(result.toString()); 
    });
    
    //res.status(200).send('Curso API - obtener curso'); 

});


module.exports = router;