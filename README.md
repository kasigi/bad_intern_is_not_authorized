# The Bad Intern is Not Authorized

## Scenario

Your development team was asked to build a management system for a nearby animal park. It will be used by keepers and managers to locate individual animals and log feedings. It's very important that certain actions are restricted to certain users.

Unfortunately due to the team being understaffed, this project was left to the intern to complete and they have done a horrible job. The client was testing the APIs out and the authorization system is completely broken. They are *FURIOUS*! The account manager is in the conference room feeding the client danishes from the nearby bakery. The danish supply will be exhausted in 90 minutes. You need to have a working demo ready by then!

### Technical Notes

* This system will be used by both a React front end (not yet built), and another back-end server. As a result of the latter, ONLY the GET and POST methods will be supported.
* There is sample data being loaded into the system including test users. These can be found in the ```seeddata/``` folder.

### Role Based Access Control

The concept behind Role-based Access Control (RBAC) is that each job function in the organization has a 'role' and each user is assigned the roles based on their work. Each API function will require one of several roles before it allows the user to proceed. For example - a delete action may be limited to managers or administrators.

In this scenario, we have several pre-defined roles that have both human-readable and machine names (these are all defined in ```seeddata/roles/json```). We want each protected function in our code to have a list of roles described by their machine names. It will then look at the user's roles and see if there are any matches?

#### Why 'machinenames'?

Often we want something to have both a human-friendly name. This may include spaces, punctuation, and should be changable without breaking anything. Additionally, we don't know in advance what _id the database server will assign to our roles in the database. In this scenario we want to assign our own *immutable* identifier that is easy to code with. This is the purpose of the machine name. We can _id's change between database servers, changes in the human-friendly name but still have our code work.

### Required User Storeies from the Product Management Team

* As a super admin, I should be able to take ANY of the actions listed below.
* As a keeper or lead keeper, I should be able to feed the animals
* As a logged in user, I should be able to see the feeding status of any animals including where their field is and their feeding log
* As a logged in user, I should be able to get a list of all animals
* As a logged in user, I should be able to get a list of fields
* As a logged in user, I should be able to get a list of species
* As a lead keeper, I should be able to move animals between fields
* As a lead keeper, I should be able to rename an animal
* As a lead keeper, I should be able to add or remove animals
* As a lead keeper, I should be able to add or edit species
* As a lead keeper, I should be able to edit a field
* As a super admin, I should be able to add or remove fields
* As a super admin, I should be able to remove species

### Stories NOT included in the demo

These stories are NOT part of this project and can be safely ignored.

* As a super admin, I can create, edit, or delete users including assigning roles
* As a super admin, I can create, edit, or delete fields
* As a super admin, I can create, edit, or delete roles

### Methodology

You will need to set the system locally use Postman or equivalent tools to make requests against the API. There is a postman collection json file that you can use to start your testing.

1. Open Postman
2. Import the postman collection
3. Go to the variables and make sure the ```base_url``` is correct for your system
4. After loggin in, you can update the ```token``` variable with your authorization token

Note: This postman collection is just a STARTER. You may need to add more requests.

## Learning Goals

This scenario is designed to help practice several skills that you will need working on development teams:

1. Debugging
2. Reading and troubleshooting code written by others
3. Understanding a basic role-based authorization system

## System Setup

### Requirements

* Node 20.x+
* MongoDB 7+

(These are what the application was tested against, it may be possible to run on newer or older Node and MongoDB instances)

### Steps

1. Install required node packages (```npm i```)
2. Copy the ```sample.env``` file to ```.env```
3. Update ```.env``` with the correct server addresses, credentials, and values
4. Run the application with ```npm run start```. Note: The *FIRST* time you start the application, it will seed the database with sameple data. This may take some time.

### To Reseed

If you want to reseed the database and/or set it back to the initial state:

1. Stop the application if it is running
2. Run ```npm run reseed``` and it will force a reseed operation
