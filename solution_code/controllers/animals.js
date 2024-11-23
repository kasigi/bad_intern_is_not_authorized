const Animal = require('../models/animal.js');
const Field = require('../models/field.js');


// Rename Animal Controller - only allow animal to rename
exports.renameAnimal = async function(req,res,next){

    let animal;
    try {
        // Get the animal
        animal = await Animal.findById(req.params.animalId);
    }catch(error){
        // If animal is not found return error
        return res.status(500).json(error);
    }

    // Create new animal objects
    try{
        let newAnimal = animal;
        newAnimal.name = req.body.name;

        // Save the animal
        const updatedAnimal = await Animal.findByIdAndUpdate(
            req.params.animalId,
            newAnimal,
            {new:true});
            return res.status(200).json(updatedAnimal);

    }catch(error){
        // Throw error if fail
        return res.status(500).json(error);
    }
}

// Get one animal
exports.getOneAnimal = async function (req,res,next){

    try {
        // Retrieve one animal and fill in species and field
        const animal = await Animal.findById(req.params.animalId).populate('species').populate('field');

        // Return the result
        return res.status(200).json(animal);
      } catch (error) {

        // Throw an error if none found
        return res.status(500).json(error);
      }

}

// Get all animals
exports.getAllAnimals = async function(req,res,next){

    try {
        // Retrieve all animals and fill in species and field
        const animal = await Animal.find(req.params.animalId).populate('species').populate('field');

        // Return the result
        res.status(200).json(animal);
      } catch (error) {

        // Throw an error if none found
        res.status(500).json(error);
      }
}


// Feed an animal
exports.feedAnimal = async function (req,res,next){

    let animal;
    try {
        // Get the animal
        animal = await Animal.findById(req.params.animalId);
    }catch(error){
        // If animal is not found return error
        return res.status(500).json(error);
    }

    // If the notes field is not defined, create empty notes field
    let notes;
    if(typeof req.body.notes == 'undefined'){
        notes = ""
    }else{
        notes = req.body.notes;
    }

    // Get the current user's id to use as the keeper ID
    const keeperID = req.user._id;

    try{

        // Append the feeding entry to the animal
        animal.feedingLog.push({
            keeper: keeperID,
            notes:notes
        });

        // Save the animal
        const updatedAnimal = await Animal.findByIdAndUpdate(
            req.params.animalId,
            animal,
            {new:true});
            return res.status(200).json(updatedAnimal);

    }catch(error){
        // Throw error if fail
        return res.status(500).json(error);
    }

}

// Move an animal to a different field
// {
//     "fieldId":"someFieldID"
// }
exports.moveAnimal = async function (req,res,next){


    // Get the target field
    let field;
    try {
        // Get the animal
        field = await Field.findById(req.body.fieldId);
    }catch(error){
        // If animal is not found return error
        return res.status(500).json(error);
    }

    // If field is not found, return error

    let animal;
    try {
        // Get the animal
        animal = await Animal.findById(req.params.animalId);
    }catch(error){
        // If animal is not found return error
        return res.status(500).json(error);
    }


    try {

        // Try to update the record
        animal.field = field._id
        const updatedAnimal = await Animal.findByIdAndUpdate(
            req.params.animalId,
            animal,
            {new:true});
        
        // Return new animal object
        return res.status(200).json(updatedAnimal);


    }catch(error){
        // Throw error if fail
        return res.status(500).json(error);

    }

}


// Add an animal
/*
    {
        "name":"Winston",
        "species":"someSpeciesID",
        "field":"someFieldID"
    }
*/
exports.addAnimal = async function (req,res,next){
    
    // Attempt to create the animal
    try {
        const animal = await Animal.create(req.body);

        // Return new animal on success
        return res.status(201).json(animal);
      } catch (error) {

        // Throw error if fail
        console.log(error);
        return res.status(500).json(error);
      }

}


// Remove an animal
/*
    {
        "id":"someAnimalID"
    }
*/
exports.removeAnimal = async function (req,res,next){
    // Attempt to remove the animal
    try {

        await Animal.findByIdAndDelete(req.body.id);

        // Return true on success
        return res.status(201).json(true);
      } catch (error) {

        // Throw error if fail
        console.log(error);
        return res.status(500).json(error);
      }
}

