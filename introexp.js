const express = require('express');
const server = express();

const database = ["Avengers", "Batman","Superman"];
server.get('/', (req, res) => {
    res.send("Home Page route");
})
server.get('/about', (req, res) => {
    res.send("This is the about page");
})
server.get('/node', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.send(`
    <h1>Node JS</h1>
    <ul>
    <li>Jamshoro</li>
    <li>Hyderabad</li>
    </ul>
    <h3>Hostelin</h3>
    `);
})
server.get('/movies', (req, res) => {
    res.send(database);
})
server.get('*', (req, res) => {
    res.send("404 Error");
})
server.listen(3000, () => {
    console.log("Express server is listening at port 3000");
});