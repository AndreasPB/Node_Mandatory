// const Joi = require('joi'); // Brug senere til post, put, patch validering
const express = require('express');
const app = express();
const path = require('path');
// const { func } = require('joi');
// const router = express.Router();
// const http = require('http'); // ? er vel erstattet af Express
const port = process.env.PORT || 8080; //  process.env.PORT til heruko og 8080 for lokalt(udvikling)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/static", express.static('./static/'));

// Homepage
app.get("/", (req, res) => {
    return res.sendFile(__dirname + '/static/html/index.html');
});

// API
app.get("/api", (req, res) => {
    return res.sendFile(__dirname + '/static/html/api.html');
});

app.get('/api/data', (req, res) => {
    res.sendFile(__dirname + '/static/json/data.json');
});

let apiObject = require(__dirname + '/static/json/data.json');

app.get('/api/data/:id', (req, res) => {
    console.log(apiObject)

    const data = apiObject.find(c => c.id === parseInt(req.params.id));
    
    console.log( data );
    // 404
    if (!data) return res.status(404).send('The data with the given ID was not found!');
    res.send(data);
});

// Setup
app.get('/setup', (req, res) => {
    res.sendFile(__dirname + '/static/html/setup.html');
})

// Extra
app.get('/extra', (req, res) => {
    res.sendFile(__dirname + '/static/html/extra.html');
})

app.post('/api/data', (req, res) => {
    // Validate
    // const { error } = ValidateData(req.body);

    // if (error) return res.status(400).send(error.details[0].message);

    const data = {
        id: apiObject.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        ip_address: req.body.ip_address
    }
    apiObject.push(data);
    res.send(apiObject);
});

app.put('/api/data/:id', (req, res) => {
    // Look up the course
    const data = apiObject.find(c => c.id === parseInt(req.params.id));
    // If not existing, 404
    if (!data) return res.status(404).send('The data with the given ID was not found!');
    
    // Validate
    // Object destructuring version
    // const { error } = validateData(req.body);
    // If invalid, 400
    // if (error) return res.status(400).send(error.details[0].message);
    
    // Update course

    apiObject.first_name = req.body.first_name,
    apiObject.last_name = req.body.last_name,
    apiObject.email = req.body.email,
    apiObject.gender = req.body.gender,
    apiObject.ip_address = req.body.ip_address
    // Return the updated course
    res.send(apiObject
    );
});

// Validation - For reuse
function ValidateData(data) {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        ip_address: Joi.required()
    });
}

// Navbar
app.get("/navbar", (req, res) => {
    return res.sendFile(__dirname + '/static/navbar.html');
});

// Middleware
app.get("/greeting", (req, res) => {
    return res.redirect("/");
});


app.listen(port, (error) => {
    if (error) {
        console.log("Error starting the server");
    }
    console.log("Server is running on port", port);
});
