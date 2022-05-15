//Requirements
const { notes } = require("./db/notes");
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//function to find note by id
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

//creates a new note and adds it to the json file
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "./db/notes.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

//deletes note from json file and updates note ids to their new position
function deleteNote(id, notesArray) {
    const noteId = id;
    notesArray.splice(noteId, 1);
    notesArray.forEach(element => {
        let i = notesArray.length;
        element.id = i - 1;
        i++;
    });
    fs.writeFileSync(
        path.join(__dirname, "./db/notes.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
}

// home route to return `index.html`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// /notes route will return the notes.html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//api call to serve notes json file
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//api route to post new note when saved
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = createNewNote(req.body, notes);

    res.json(newNote);
});

//api route to delete notes when delete button is clicked
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    deleteNote(id, notes);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});