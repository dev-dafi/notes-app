const chalk = require("chalk");
const fs = require("fs");

const getNotes = () => {
    return "Your notes ... ";
};


/**
 * Save note to filesystem.
 * @param {String} title Title of note which should be added
 * @param {String} body Content of note which should be added
 */

const addNote = (title, body) => {
    const notes = loadNotes();

    // Filter function gets called for EVERY entry in notes and stores duplicate in duplicateNotes
    // true if title exists ==> stored in found duplicate
    const duplicateNotes = notes.filter((note) => note.title === title)
    
    // Didn't find duplicate?
    if (duplicateNotes.length === 0) {
        notes.push({
            title : title,
            body : body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added."));
    } else {
        console.log(chalk.yellow.inverse("Note title already taken."));
    }
}


/**
 * Removes note from file.
 * @param {String} title Title of note which should be removed
 */

const removeNote = (title) => {
    const notes = loadNotes();
    // keep all notes, whose title are 'NOT' the one to remove
    const notesToKeep = notes.filter((note) => note.title !== title);    

    if (notes.length === notesToKeep.length) {
        console.log(chalk.inverse.yellow("Note " +title+ " doesn't exist."));
    } else {
        console.log(chalk.inverse.green("Note " +title+ " has been removed."));
        saveNotes(notesToKeep);   
    }
}


/**
 * Load stored notes if available.
 * @returns Stored notes
 */

const loadNotes = () => {

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

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
}


