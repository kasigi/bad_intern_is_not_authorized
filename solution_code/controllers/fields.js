const Field = require('../models/field.js');

// Get one field
exports.getOneField = async function (req,res,next){

    try {
        // Retrieve one field and fill in field and field
        const field = await Field.findById(req.params.fieldId);

        // Return the result
        return res.status(200).json(field);
      } catch (error) {

        // Throw an error if none found
        return res.status(500).json(error);
      }

}

// Get all fields
exports.getAllFields = async function(req,res,next){

    try {
        // Retrieve all fields and fill in field and field
        const field = await Field.find();

        // Return the result
        res.status(200).json(field);
      } catch (error) {

        // Throw an error if none found
        res.status(500).json(error);
      }
}

// Remove a field
exports.removeField = async function (req,res,next){

    // Check for Authorization
    const allowed = await checkRoleByName(req.user._id,[]);

    if(!allowed){
        return res.status(401).json({ error: 'Not Authorized' });
    }

    // Attempt to remove the field
    try {

        await Field.findByIdAndDelete(req.params.fieldId);

        // Return true on success
        return res.status(201).json(true);
      } catch (error) {

        // Throw error if fail
        console.log(error);
        return res.status(500).json(error);
      }
}

// Edit a field
exports.editField = async function (req,res,next){

    // Check for Authorization
    const allowed = await checkRoleByName(req.user._id,['leadkeeper']);

    if(!allowed){
        return res.status(401).json({ error: 'Not Authorized' });
    }

    // Attempt to remove the field
    try {

        const field = await Field.findByIdAndUpdate(req.params.fieldId,req.body,{new:true});

        // Return true on success
        return res.status(201).json(field);
      } catch (error) {

        // Throw error if fail
        console.log(error);
        return res.status(500).json(error);
      }
}

// Add an field
/*
    {
        "name":"Mid-atlantic Mountains",
        "description":"Wooded enclosure suitable for deer, bear, and turkeys"        
    }
*/
exports.addField = async function (req,res,next){

    // Check for Authorization
    const allowed = await checkRoleByName(req.user._id,[]);

    if(!allowed){
        return res.status(401).json({ error: 'Not Authorized' });
    }

    // Attempt to create the field
    try {
        const field = await Field.create(req.body);

        // Return new field on success
        return res.status(201).json(field);
      } catch (error) {

        // Throw error if fail
        console.log(error);
        return res.status(500).json(error);
      }

}