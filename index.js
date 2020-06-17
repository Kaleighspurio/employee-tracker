const inquirer = require('inquirer');
const Database = require('./db/Database');
const newDB = new Database();
const connection = require('./db/connection');
const { end } = require('./db/connection');

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

const start = () => {
    inquirer.prompt(startQuestion).then((answer) => {
        if (answer.choices === "View All Employees"){
        newDB.viewEmployees();
        } else if (answer.choices === "View All Employees by Department") {
            connection.query('SELECT department FROM department', (err, result) => {
                if (err){
                    throw err;
                }
                const departmentArray = [];
                result.forEach((department) => {
                    departmentArray.push(department.department);
                })
                inquirer.prompt({
                    type: "list",
                    name: "department",
                    message: "Which department would you like to view?",
                    choices: departmentArray
                }).then((answer) => {
                    console.log(answer.department);
                    newDB.findEmployeeByDepartment(answer.department);
                });
                
            });
            // newDB.findDepartment();
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


start();
