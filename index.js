const inquirer = require('inquirer');
const Database = require('./db/Database');
const newDB = new Database();
const connection = require('./db/connection');
const { end } = require('./db/connection');

const startQuestion = [
    {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Add Department",
            "Add Role",
            "Update an Employee's Manager",
            "Quit"
        ]
    }
];

const start = () => {
    inquirer.prompt(startQuestion).then((answer) => {
        if (answer.choices === "View All Employees"){
        newDB.viewEmployees();
        } else if (answer.choices === "View All Employees by Department") {
            newDB.findDepartment();
        }  else if (answer.choices === "Add Employee") {
            newDB.createEmployee();
        } else if (answer.choices === "Remove Employee") {
            newDB.removeEmployee();
        } else if (answer.choices === "Update Employee Role") {
            newDB.updateEmployeeRole();
        } else if (answer.choices === "Add Department") {
            newDB.createDepartment();
        } else if (answer.choices === "Add Role") {
            newDB.createRole();
        } else if (answer.choices === "Update an Employee's Manager") {
            newDB.updateEmployeeManager();
        } else {
            newDB.quit();
            return;
        }
        // start();
    });
}


start();

// Bonus items if time allows:
//             "View all Employees by Manager",
// else if (answer.choices === "View all Employees by Manager") {
//     newDB.findEmployeesByManager();
// }