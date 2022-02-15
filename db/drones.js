const express = require('express');
const router = express.Router();

const Drone = require("../models/Drone.model");

router.get('/drones', (req, res, next) => {
  Drone.find()
  .then((allDrones)=>{
    res.render("../views/drones/list",{drones: allDrones})
  })
  .catch(err=>{
    console.log("Something went wrong", err)
  })
});

router.get('/drones/create', (req, res, next) => {
  res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  Drone.create({
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
    image: req.body.image,
  })
  .then((results)=>{
    res.redirect("/drones")
  }).catch(err=>{
    console.log("Something went wrong", err)
  })
});

router.get('/drones/:id/edit', (req, res, next) => {
Drone.findById(req.params.id)
.then((found)=>{
  res.render("drones/update-form", {  
    name: found.name,
    propellers:found.propellers,
    maxSpeed: found.maxSpeed,
    image: found.image,
    _id: found._id})
})
.catch(err=>{
  console.log("Something went wrong", err)
})
});

router.post('/drones/:id/edit', (req, res, next) => {
  Drone.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  })
  .then(()=>{
    res.redirect("/drones")
  })
  .catch(err=>{
    console.log("Something went wrong", err)
  })
});

router.post('/drones/:id/delete', (req, res, next) => {
  Drone.findByIdAndDelete(req.params.id)
  .then((destroyed)=>{
    console.log("destroyed drone",destroyed )
    res.redirect('/drones')
  })
  .catch(err=>{
    console.log("Something went wrong:", err)
  })
})

module.exports = router;