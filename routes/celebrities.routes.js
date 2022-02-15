// // const express = require('express').Router();
// const router = require('express').Router();
// const Celebrity = require('../models/celebrity.model');


// //get home page
// router.get('/celebrities/create', (req, res, next) => {
//     Celebrity.create({
//         name: req.body.name,
//         occupation: req.body.occupation,
//         catchPhrase: req.body.catchPhrase,
//     })
//     .then((results) => {
//         console.log('Celebrity added', results);
//         res.redirect('/celebrities/celebrities');
//     });
//     // .catch((err) => {
//     //     console.log('Something went wrong', err);
//     //     res.render('/celebrities/create');
//     // });
// });

// //New celeb form get and post

// router.get('/celebrities/create', (req, res) => {
//     res.render('../views/celebrities/new-celebrity');
//     });
   
// router.post('/create', (req,res) => {
//     Celebrity.create({
//         name: req.body.name,
//         occupation: req.body.occupation,
//         catchPhrase: req.body.catchPhrase,
//     })
//     .then((newCeleb) => {
//         console.log('Creation was Succesful', newCeleb);
//         res.redirect('/celebrities/all-celebrities');
//     });
//     // .catch((err) => {
//     //     console.log('Something went wrong', err);
//     // });
// })    




const router = require("express").Router();
const Celebrity = require("../models/celebrity.model")

// all your routes here

router.get("/celebrities", (req, res) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/celebrities", { celebrities })
        })
        .catch(err => {
            throw new err
        })
})

router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})

router.post("/create", (req, res) => {
   
    Celebrity.create(req.body)
        .then(() => {
            res.redirect("celebrities")
        })
        .catch(() => {
            res.redirect("/celebrities/create")
        })
})

module.exports = router;