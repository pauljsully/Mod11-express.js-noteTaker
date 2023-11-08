const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const PORT = process.env.port || 3001;

const dbNotes = require('./db/db.json');

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//return all saved notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });
})

//grabs notes from body of request
app.post('/api/notes', (req, res) => {
    
    const newNote = req.body;

    //unique ID
    newNote.id = uuidv4();

    dbNotes.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(dbNotes))
    res.json(dbNotes)
})

app.delete('/api/notes/:id', (req, res) => {
    const idToDelete = req.params.id.toString(); // Convert req.params.id to a string
    const newDb = dbNotes.filter((note) => note.id !== idToDelete);
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb));

    readFile.json(newDb);
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
    console.log(`API server at http://localhost:${PORT}`);
});
