const html = require('express').Router();
const path = require('path');

// get /.notes returns notes.html
html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// get wildcard returns index.html
html.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
};

module.exports = html
