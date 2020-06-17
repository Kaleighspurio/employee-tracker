const connection = require('./connection');

const array = [];

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
        this.connection.query('SELECT department FROM department', (err, result) => {
            const departmentArray = [];
            result.forEach((department) => {
                departmentArray.push(department.department);
            })
            console.log(departmentArray);
            return departmentArray;
        });
    }

    findEmployeeByDepartment(){
        this.connection.query(
            // write the query here...
        );
    }

    updateEmployeeRole(){

    }

    updateEmployeeManager(){}

    quit(){
        this.connection.end();
    }
}

module.exports = Database;