const User = require('./models/user');
const Animal = require('./models/animal');
const Role = require('./models/role');
const Field = require('./models/field');
const Species = require('./models/species');

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const SALT_LENGTH = 12;


// Function to check for seeding
async function isSeeded(){
    // Get the animals

    const animals = await Animal.findOne({})

    // If no animals
    if(!animals){
        // Not seeded
        return false;
    }else{
    // Else seeded
        return true;

    }

}

// Do the Seeding
async function runSeeder(){
    // Check if needed to be seeded

    const isDBSeeded = await isSeeded();

    if(isDBSeeded && process.argv.indexOf('-reseed') == -1){
        // DB is already seeded, do not reseed
        console.log("Database already seeded")
        return false;
    }else{
        console.log("Starting database seed")
    }

    const startTime = Date.now();

    // Create Roles from roles.json
    console.log("Seeding Roles")

    const dirPath = path.join(__dirname,  'seeddata');
    const jsonRoleFile = fs.readFileSync(path.join(dirPath, "roles.json"), 'utf8');
    const jsonRoleData = JSON.parse(jsonRoleFile);

    // Removing extant roles
    await Role.deleteMany({});

    // Load the roles json
    for (let i = 0; i < jsonRoleData.length; i++) {
        // Create role
        const newRole = {
            name: jsonRoleData[i]['name'],
            machineName: jsonRoleData[i]['machineName']
        }

        const user = await Role.create(newRole)

    }
    console.log("Seeding Roles Complete: ", Date.now() - startTime)


    // Clear users
    console.log("Seeding Users")

    await User.deleteMany({});

    // Create Users from users.json
    const jsonUserFile = fs.readFileSync(path.join(dirPath, "users.json"), 'utf8');
    const jsonUserData = JSON.parse(jsonUserFile);

        // Loop through each
        for (let i = 0; i < jsonUserData.length; i++) {

            // Look up the intended role ID
            const newRoles = [];

            for(let r=0; r < jsonUserData[i]['roles'].length; r++){
                const role = await Role.findOne({
                    machineName: jsonUserData[i]['roles'][r]
                })

                if(role){
                    newRoles.push(role._id)
                }
            }

            const newUser = {
                username: jsonUserData[i]['username'],
                firstName: jsonUserData[i]['firstName'],
                lastName: jsonUserData[i]['lastName'],
                roles: newRoles,
                hashedPassword: bcrypt.hashSync(jsonUserData[i]['defaultPassword'], SALT_LENGTH)
            }

            // Create user
            const user = await User.create(newUser)

        }
    console.log("Seeding Users Complete: ", Date.now() - startTime)


    console.log("Seeding Species")

    await Species.deleteMany({});

    // Create the species from species.json
    const jsonSpeciesFile = fs.readFileSync(path.join(dirPath, "species.json"), 'utf8');
    const jsonSpeciesData = JSON.parse(jsonSpeciesFile);

        // Loop through each
        for (let i = 0; i < jsonSpeciesData.length; i++) {
            // Create Species
            const newSpecies = {
                name: jsonSpeciesData[i]['name'],
                description: jsonSpeciesData[i]['description']
            }

            // Save Species
            const user = await Species.create(newSpecies)
        }

    // Get all species
    const species = await Species.find({});


    console.log("Seeding Species Complete: ", Date.now() - startTime)


    console.log("Seeding Fields")

    // Clear fields
    const fdelResult = await Field.deleteMany({});

    // Create the Fields from fields.json
    const jsonFieldsFile = fs.readFileSync(path.join(dirPath, "fields.json"), 'utf8');
    const jsonFieldsData = JSON.parse(jsonFieldsFile);

        // Loop through each
        for (let i = 0; i < jsonFieldsData.length; i++) {
            // Create Species
            const newField = {
                name: jsonFieldsData[i]['name'],
                description: jsonFieldsData[i]['description']
            }

            // Save Species
            const user = await Field.create(newField)
        }

    console.log("Seeding Fields Complete: ", Date.now() - startTime)

    // Get the created fields
    const fields = await Field.find({});

    console.log("Seeding Animals")

    // Clear animals
    await Animal.deleteMany({});

    // Choose number of animals
    const animalCount = 172;
    

    // Generate the unique names for all the animals
    const animalNames = [];
    let nameLoopCount = 0;

    while(animalNames.length < animalCount){
        const newName = faker.person.firstName();
        if(animalNames.indexOf(newName) == -1){
            animalNames.push(newName);
        }
        nameLoopCount++;
        if(nameLoopCount > animalNames * 10){
            break;
        }
    }

    // Get keeper role ID's
    const keeperRoleIDData = await Role.find( {
          "$or": [
            {
              machineName: "keeper"
            },
            {
                machineName: "leadkeeper"
            }
          ]
      });
    
    const keeperRoleIDs = [];
    for(let k=0; k<keeperRoleIDData.length; k++){
        keeperRoleIDs.push(keeperRoleIDData[k]['_id'])
    }

    // Get all users with role keeper or lead keeper
    const keepers = await User.aggregate([{
            $match:{
            "roles":{
                $in:keeperRoleIDs
            }
        }
    }]);


    // Use faker to create animals
    for(let i=0; i<animalNames.length; i++){
        // Choose a species
        const speciesIndex = Math.floor(Math.random() * species.length)
        const speciesID = species[speciesIndex]['_id'];

        // Choose a field
        const fieldsIndex = Math.floor(Math.random() * fields.length)
        const fieldsID = fields[fieldsIndex]['_id'];

        // Create the Feeding Log

            // Create the log array
            const feedingLog = [];

            // Determine Feeding Log Length
            const feedingLogEntryCount = Math.ceil(Math.random() * 80)

            // For each entry in the log
            for(let f=0; f<feedingLogEntryCount;f++){
                // Choose a keeper
                const keeperIndex = Math.floor(Math.random() * keepers.length);

                // Generate some notes
                const notes = faker.lorem.lines({ min: 1, max: 3 })

                // Add log entry to array
                feedingLog.push({
                    keeper: keepers[keeperIndex],
                    notes: notes
                });

            }


        // Create the animal
        const newAnimal = {
            name: animalNames[i],
            species: speciesID,
            field: fieldsID,
            feedingLog: feedingLog
        }
        
        const animal = await Animal.create(newAnimal)

    }
    console.log("Seeding Animals Complete: ", Date.now() - startTime)

    console.log("Seeding Complete With Duration: ", Date.now() - startTime)
    return true;
    }
       

    module.exports = runSeeder;