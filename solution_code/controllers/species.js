const Species = require('../models/species.js');

// Get one species
exports.getOneSpecies = async function (req,res,next){

    try {
        // Retrieve one species and fill in species and field
        const species = await Species.findById(req.params.speciesId);

        // Return the result
        return res.status(200).json(species);
      } catch (error) {

        // Throw an error if none found
        return res.status(500).json(error);
      }

}

// Get all speciess
exports.getAllSpecies = async function(req,res,next){

    try {
        // Retrieve all speciess and fill in species and field
        const species = await Species.find();

        // Return the result
        res.status(200).json(species);
      } catch (error) {

        // Throw an error if none found
        res.status(500).json(error);
      }
}

// Remove a species
exports.removeSpecies = async function (req,res,next){

      // Check for Authorization
      const allowed = await checkRoleByName(req.user._id,[]);

      if(!allowed){
          return res.status(401).json({ error: 'Not Authorized' });
      }

    // Attempt to remove the species
    try {

        await Species.findByIdAndDelete(req.params.speciesId);

        // Return true on success
        return res.status(201).json(true);
      } catch (error) {

        // Throw error if fail
        console.log(error);
        return res.status(500).json(error);
      }
}

// Edit a species
exports.editSpecies = async function (req,res,next){

    // Check for Authorization
    const allowed = await checkRoleByName(req.user._id,['leadkeeper']);

    if(!allowed){
        return res.status(401).json({ error: 'Not Authorized' });
    }

    // Attempt to remove the species
    try {

        const species = await Species.findByIdAndUpdate(req.params.speciesId,req.body,{new:true});

        // Return true on success
        return res.status(201).json(species);
      } catch (error) {

        // Throw error if fail
        console.log(error);
        return res.status(500).json(error);
      }
}

// Add an species
/*
    {
        "name":"Hamster",
        "description":"Small, round, and furry"        
    }
*/
exports.addSpecies = async function (req,res,next){
    
    // Check for Authorization
    const allowed = await checkRoleByName(req.user._id,['leadkeeper']);

    if(!allowed){
        return res.status(401).json({ error: 'Not Authorized' });
    }

    // Attempt to create the species
    try {
        const species = await Species.create(req.body);

        // Return new species on success
        return res.status(201).json(species);
      } catch (error) {

        // Throw error if fail
        console.log(error);
        return res.status(500).json(error);
      }

}