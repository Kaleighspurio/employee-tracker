const connection = require('./connection');
const inquirer = require('inquirer');
const { start } = require('repl');
// const array = [];

class Database {
    constructor(){
        this.connection = connection;
    }

    viewEmployees(){
        this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.salary, department.department, role.title, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id=role.id) LEFT JOIN department ON (role.department_id=department.id);', (err, results) => {
            if (err) {
                throw err;
            }
        console.table(results);
        });
    }


    createDepartment(){
        this.connection.query(
            // write the query here...
            'SELECT'
        );
    }

    createEmployee(){
        this.connection.query(
            // write the query here...
        );
    }

    createRole(){
        this.connection.query(
            // write the query here...
        );
    }

    removeEmployee(){}

    // findRole(){
    //     this.connection.query(
    //         // write the query here...
    //     );
    // }

    findEmployeesByManager(){
        this.connection.query(
            // write the query here...
        );
    }

    findDepartment(){

    }

    findEmployeeByDepartment(department){
        console.log(department);
        this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.salary, department.department, role.title, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id=role.id) LEFT JOIN department ON (role.department_id=department.id) WHERE department.department=?;', [department], (err, results) => {
            if (err) {
                throw err;
            } 
        console.table(results);
        });
        // this.connection.query('SELECT * FROM department WHERE department=? RIGHT JOIN role (department.id=role.department_id) RIGHT JOIN employee (role.id=employee.role_id)', [department], (err, result) => {
        //     console.table(result)
        // });
        // this.connection.query('SELECT department FROM department', (err, result) => {
        //     if (err){
        //         throw err;
        //     }
        //     const departmentArray = [];
        //     result.forEach((department) => {
        //         departmentArray.push(department.department);
        //     })
        //     inquirer.prompt({
        //         type: "list",
        //         name: "department",
        //         message: "Which department would you like to view?",
        //         choices: departmentArray
        //     }).then();
        // });
    }

    updateEmployeeRole(){

    }

    updateEmployeeManager(){}

    quit(){
        this.connection.end();
    }
}

module.exports = Database;