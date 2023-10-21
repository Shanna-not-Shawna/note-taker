const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// get db.json data and parse it
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    });
});

notes.post('/', (req, res) => {
    console.info('${req.method} request received to add new note');
    console.log(req.body);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json')
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.status(201).json(response);
    };
});

notes.delete('/:id', (req, res) => {
    const notesID = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== notesID);
        writeToFile('./db/db.json', result)
        res.json('${notesID} has been deleted')
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = notes