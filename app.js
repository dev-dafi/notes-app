// NPM MODULES
const validator = require("validator");

// LOCAL MODULES
const getNotes = require("./notes.js");


const notes = getNotes();
console.log(notes);

console.log(validator.isEmail("email@example.com"));