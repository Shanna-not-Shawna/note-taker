const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001;

// to generate random id for each note
// const uuid = require('./helpers/uuid')

// Need to get todo list items in string format, parse it, add to the array, then stringify it again to store. With parsedArr.push(newToDo)?

// Need 2 HTML routes:
    // GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    const filePath = path.join(__dirname, 'notes.html');
    res.sendFile(filePath);
});

// wildcard should return the index.html file
app.get('*', req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/404'))
}

// Need 1 API route:
    // GET /api/notes should read the db.json file and return all saved notes as JSON.
    // POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.get('./api/notes', (req, res) => {
    const dbFilePath = path.join(__dirname, 'db.json');
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'unable to read the data.' });
        } else {
            try {
                const notes = JSON.parse(data);
                res.json(notes);
            } catch (error) {
                res.status(500).json({ error: 'Error parsing the data.'});
            }
        }
     });
});

// BONUS: add a delete route

// listen
app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});