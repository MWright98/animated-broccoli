const router = require('express').Router();
const path = require('path');

router.get('api/notes', (req, res) => {
    res.json(notes);
});

router.get('/api/notes/:id', (req, res) => {
    console.log("get note to del; " + req.params.id);
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/api/notes', (req, res) => {
    const newNote = req.body;

    notes.push(newNote);
    res.json(newNote);
});

router.delete('/api/notes/:id', (req, res) => {
    const note = req.body;
});

module.exports = router;