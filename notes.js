const chalk = require("chalk");
const fs = require("fs");

const getNotes = function () {
    return "Your notes ... ";
};


/**
 * Save note to filesystem.
 * @param {String} title 
 * @param {String} body 
 */

const addNote = function (title, body) {
    const notes = loadNotes();

    // Filter function gets called for EVERY entry in notes and stores duplicate in duplicateNotes
    const duplicateNotes = notes.filter(function(note){
        // true if title exists ==> found duplicate
        return note.title === title;
    })
    
    // Didn't find duplicate?
    if (duplicateNotes.length === 0) {
        notes.push({
            title : title,
            body : body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added."));
    } else {
        console.log(chalk.red.inverse("Note title already taken."));
    }
}


/**
 * Load stored notes if available.
 * @returns Stored notes
 */

const loadNotes = function (){

    try {
        // read file from filesystem
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = JSON.stringify(dataBuffer);
        return JSON.parse(dataBuffer);
    } catch(e) {
        // notes file doesn't exist? return empty array
        return [];
    }
}


/**
 * Save note into file
 * @param {[notes]} notes 
 */

const saveNotes = function (notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}


