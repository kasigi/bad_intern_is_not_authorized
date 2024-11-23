const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const testJWTRouter = require('./routes/test-jwt');
const usersRouter = require('./routes/users');
const animalsRouter = require('./routes/animals');
const runSeeder = require('./seeder')

mongoose.connect(process.env.MONGODB_URI,{
    dbName: process.env.MONGODB_NAME,
    retryWrites: true,
    w:"majority"
});

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

// Check to see if seeder is needed



// Run seeder
runSeeder();


// Routes go here
app.use('/test-jwt', testJWTRouter);
app.use('/user', usersRouter);
app.use('/animal', animalsRouter);


app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} works`);
    console.log(`http://localhost:${app.get("port")}/`);
});