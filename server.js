const path = require('path');
const express = require ('express');
const fs = require('fs')
const db = path.join(__dirname, "db/db.json")
const {v4:uuid} = require('uuid')

let app = express();
let PORT = process.env.PORT || 3000;

const publicPath = express.static(path.join(__dirname, "public"));
app.use(publicPath);

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

readDB = () => {
    if (fs.existsSync(db)){
        return JSON.parse(fs.readFileSync(db));
     }
     else {
         return []
     }
}

appendDB = (note) => {
    let allNotes = readDB();

    allNotes.push(note)
    fs.writeFileSync(db, JSON.stringify(allNotes));
}

deleteNote = (id) => {
    let allNotes = readDB();
    for (let i = 0; i < allNotes.length; i++) {
        if(id === allNotes[i].id){
            allNotes.splice(i, 1)
            break;
        }
    }
    fs.writeFileSync(db, JSON.stringify(allNotes));
    
}

// Display notes html page
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
    console.log("/notes called")
})


// Display all notes as JSON
app.get("/api/notes", function(req, res){
    console.log("display notes is called")
    return res.json(readDB());
})

// Display a single note as JSON 
app.get("/api/notes/:id", function(req, res){
    let noteID = req.params.id;
    let allNotes = readDB();

    for (let i = 0; i < allNotes.length; i++) {
        if(noteID === allNotes[i].id){
            return res.json(allNotes[i])
        }
    }
})

// create a new note
// note currently finished. Need a way to write a new id number to each new note based on the id numbers from previous id's
app.post("/api/notes", function(req, res){
    
    let newNote = req.body;
    
    newNote.id = uuid();
    console.log(newNote)

    appendDB(newNote);
    console.log("save notes")

    return res.send(200)
   
})

// delete notes
app.delete("/api/notes/:id", function(req, res){
    deleteNote(req.params.id);
    console.log("deleted")

    return res.send(200)
})

// Display index html page
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
    console.log("* is called")
})

app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT)
    
})