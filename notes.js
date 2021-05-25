const chalk = require("chalk");
const fs = require("fs");


/**
 * Save note to filesystem.
 * @param {String} title Title of note which should be added
 * @param {String} body Content of note which should be added
 */

const addNote = (title, body) => {
    const notes = loadNotes();

    // Find method runs until it founds the item, than "terminates"
    // true if title exists ==> stored in found duplicate
    const duplicateNote = notes.find((note) => note.title === title)

    // New note is not a duplicate?
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added."));
    } else {
        console.log(chalk.yellow.inverse("Note title already taken."));
    }
};


/**
 * Print all notes on console
 */

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.cyan("Your notes:"));
    notes.forEach(note => {
        console.log(note.title);
    });
}


/**
 * Reads details from a specific note, described by it's title 
 * @param {String} title Title of note which should be displayed in detail
 */

const readNote = (title) => {
    const notes = loadNotes();

    // Found match, if given title corresponds to user given title
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse.cyan(title));
        console.log(note.body);
    } else {
        console.log(chalk.inverse.red("Note not found!"));
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
        console.log(chalk.inverse.yellow("Note " + title + " doesn't exist."));
    } else {
        console.log(chalk.inverse.green("Note " + title + " has been removed."));
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
    } catch (e) {
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
    listNotes: listNotes,
    readNote: readNote,
}


