// NPM MODULES
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");

// LOCAL MODULES
const notes = require("./notes.js");


// ADD COMMAND

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
      // CLI Option --
      title: {
          describe: "Note title",
          demandOption: true,
          type: "string",
      },
      body: {
          describe: "Note description",
          demandOption: true,
          type: "string",
      }
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  }
});


// REMOVE COMMAND

yargs.command({
  command: "remove",
  describe: "Removes a note",
  builder: {
    title: {
      describe: "Remove note",
      demandOption: true,
      type: "string"
    }
  },
  handler: function (argv) {
    // console.log("Removing note");
    notes.removeNote(argv.title);
  }
});


// LIST COMMAND

yargs.command({
  command: "list",
  describe: "Lists all notes",
  handler: function () {
    console.log("List notes");
  }
});


// READ COMMAND

yargs.command({
    command: "read",
    describe: "Read note",
    handler: function() {
        console.log("Reading note");
    }
});

// console.log(yargs.argv);
yargs.parse();
