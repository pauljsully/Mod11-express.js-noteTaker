const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;




const htmlroutes = require('./routes/htmlroutes')
const apiroutes = require('./routes/apiroutes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiroutes)
app.use('/', htmlroutes)




// app.get('/api/notes', (req, res) => {
//     fs.readFile('./db/db.json', (err, data) => {
//         if (err) throw err;
//         let dbData = JSON.parse(data);
//         res.json(dbData)
//     });
// })


// app.post('/api/notes', (req, res) => {
    
//     const newNote = req.body;

//     //unique ID
//     newNote.id = uuidv4();

//     dbNotes.push(newNote)
//     fs.writeFileSync('./db/db.json', JSON.stringify(dbNotes))
//     res.json(dbNotes)
// })


// //only able to delete one. manually delete all in the db.json
// app.delete('/api/notes/:id', (req, res) => {
//     const idToDelete = req.params.id.toString(); // Convert req.params.id to a string
//     const newDb = dbNotes.filter((note) => note.id !== idToDelete);
//     fs.writeFileSync('./db/db.json', JSON.stringify(newDb));

//     res.json(newDb);
// });



// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });


app.listen(PORT, () => {
    console.log(`API server at http://localhost:${PORT}`);
});
