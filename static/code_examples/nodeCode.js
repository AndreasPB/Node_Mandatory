// API
app.get("/api", (req, res) => {
    return res.sendFile(__dirname + '/api.html');
});
let apiObject = require('./data.json');
// Get
app.get('/api/data', (req, res) => {
    res.send(apiObject);
});