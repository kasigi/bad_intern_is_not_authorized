const User = require('./models/user');
const Animal = require('./models/animal');
const Role = require('./models/role');
const Field = require('./models/field');
const Species = require('./models/species');

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

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

    if(isDBSeeded){
        // DB is already seeded, do not reseed
        console.log("Database already seeded")
        return false;
    }else{
        console.log("Starting database seed")

    }

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
    console.log("Seeding Roles Complete")



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
    console.log("Seeding Users Complete")


    console.log("Seeding Species")

    await Species.deleteMany({});

    // Create the species from species.json
    const jsonSpeciesFile = fs.readFileSync(path.join(dirPath, "species.json"), 'utf8');
    const jsonSpeciesData = JSON.parse(jsonSpeciesFile);

        // Loop through each
        for (let i = 0; i < jsonSpeciesData.length; i++) {
            // Create Species
    
        }

    // Get all species
    const species = await Species.find({});


    console.log("Seeding Species Complete")


    console.log("Seeding Fields")

    // Clear fields
    Field.deleteMany({})

    // Number of fields to create
    const fieldCount = 5

    // Use faker to create a list of fields
    for(let i=0; i<fieldCount;i++){

    }
    console.log("Seeding Complete")

    // Get the created fields
    const fields = Field.find({});

    console.log("Seeding Animals")

    // Clear animals
    await Animal.deleteMany({});

    // Choose number of animals
    const animalCount = 172;

    // Use faker to create animals
    for(let i=0; i<animalCount; i++){
        // Choose a species

        // Choose a field

        // Create the animal
    }
    console.log("Seeding Animals Complete")

    console.log("Seeding Complete")
    return true;
    }

    module.exports = runSeeder;