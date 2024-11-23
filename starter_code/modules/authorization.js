const User = require('../models/user');

/*
    This function will check to see if the user has one of the roles required.
    userId
   * @param {number} userId - current user's ID 
   * @param {array} roleMachineNames - array of roles that allow the desired action [superadmin, keeper]
    */
exports.checkRoleByName = async function(userId,roleMachineNames){

    // If either param is missing, return false
    if(!userId || !roleMachineNames || !Array.isArray(roleMachineNames)){
        console.error("Missing userId or roleMachineName");
        return false;
    }


    // Get the User
    const user = await User.findById(userId).populate('roles');

    // Loop through the roles on the user
    for(let i=0; i<user.roles.length; i++){
        
        // If the user's role machine name matches the supplied role machine name OR the user has the superadmin role, return true
        if(roleMachineNames.indexOf(user.roles[i]['machineName']) > -1 || user.roles[i]['machineName'] == 'superadmin'){
            return true;
        }

    }
    
    // Return false
    return false;
}