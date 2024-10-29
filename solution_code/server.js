const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const runSeeder = require('./seeder')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());


// Run seeder
runSeeder();


// Routes go here
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);


app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} works`);
    console.log(`http://localhost:${app.get("port")}/`);
});