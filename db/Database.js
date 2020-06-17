const connection = require('./connection');

class Database {
    constructor(connection){
        this.connection = connection;
    }
    // about 7 queries...

    createDepartments(){
        return this.connection.query(
            // write the query here...
            'SELECT'
        );
    }

    createEmployee(){
        return this.connection.query(
            // write the query here...
        );
    }

    createRole(){
        return this.connection.query(
            // write the query here...
        );
    }

    findRole(){
        return this.connection.query(
            // write the query here...
        );
    }

    findEmployee(){
        return this.connection.query(
            // write the query here...
        );
    }

    findDepartment(){
        return this.connection.query(
            // write the query here...
        );
    }

    updateEmployee(){

    }

}

module.exports = new Database(connection);