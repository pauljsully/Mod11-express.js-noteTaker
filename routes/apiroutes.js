
const router = require('express').Router();

const fs = require('fs');
const dbNotes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });
})


router.post('/notes', (req, res) => {
    
    const newNote = req.body;

    //unique ID
    newNote.id = uuidv4();

    dbNotes.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(dbNotes))
    res.json(dbNotes)
})


//only able to delete one. manually delete all in the db.json
router.delete('/notes/:id', (req, res) => {
    const idToDelete = req.params.id;
    const newDb = dbNotes.filter((note) => note.id !== idToDelete);
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb));

    res.json(newDb);
});


module.exports = router;