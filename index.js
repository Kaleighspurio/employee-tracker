const inquirer = require('inquirer');
const Database = require('./db/Database');
const newDB = new Database();

// create a prompt where the app is started
// this will ask the user what they'd like to do
// choices: [
//     {
//         name:
//         value:
//     }
// ]
const startQuestion = [
    {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
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

const viewEmployeesByDepartmentQuestion = [
    {
        type: "list",
        name: "department",
        message: "Which department would you like to view?",
        choices: []
    }
];

const start = () => {
    inquirer.prompt(startQuestion).then((answer) => {
        if (answer.choices === "View All Employees"){
        newDB.viewEmployees();
        } else if (answer.choices === "View All Employees by Department") {
            inquirer.prompt(viewEmployeesByDepartmentQuestion).then((answer) => {
                console.log(answer);
            });
            // newDB.findEmployeeByDepartment();
        } else if (answer.chocies === "View all Employees by Manager") {
            newDB.findEmployeesByManager();
        } else if (answer.choices === "Add Employee") {
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


// newDB.viewEmployees();
start();
// if the user selects to view employees it is going to call the get Employees function down below
// call the findEmployee() function from the Database class