const path = require('path');
const express = require ('express');


let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());



let notes = [
{
    id: 0,
    // find a way to have this id number increase based on previous
    // note id's
}
]

// Display notes html page
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// Display index html page
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

// Display all notes as JSON
app.get("/api/notes", function(req, res){
    return res.json(notes)
})

// Display a single note as JSON 
app.get("/api/notes/:id", function(req, res){
    let chosen = req.params.note;

    for (let i = 0; i < notes.length; i++) {
        if(chosen === notes[i].id){
            return res.json(notes[i])
        }
    }
})

// create a new note
// note currently finished. Need a way to write a new id number to each new note based on the id numbers from previous id's
app.post("/api/notes", function(req, res){
    let newNote = req.body;

    // newNote.id = 
    notes.push(newNote);
    
    res.json(newNote)
})

app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT)
})