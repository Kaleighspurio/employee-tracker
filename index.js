// require inquirer and console.table
const inquirer = require('inquirer');
// require the Database class from the Database.js

// create a prompt where the app is started
// this will ask the user what they'd like to do
// choices: [
//     {
//         name:
//         value:
//     }
// ]
const choices = [
    {
        name: "Kay",
        other: "asdf"
    },
    {
        name: "Kay",
        other: "asdf"
    }
]
console.table(choices)
// if the user selects to view employees it is going to call the get Employees function down below
// call the findEmployee() function from the Database class