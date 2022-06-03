const { Location } = require('../models');

module.exports ={
    getLocation(req, res){
        Location.find()
        .select('-__v')
        .then((locations)=>
        res.json(locations)
        )
        .catch((err)=>{
            console.log(err)
            res.status(500).json(err)
        })
    },

    getSingleLocation(req, res){
        Location.findOne({_id: req.params.locationid})
        .lean()
        .select('-__v')
        .then((location)=>{
            !location
                ? res.status(404).json({ message: 'No location with that id'})
                : res.json(location)
            })
            .catch((err)=> res.status(500).json(err))
    }
};