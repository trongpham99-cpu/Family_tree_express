const mongoose = require('mongoose');
const CONNECTION_URL = 'mongodb://localhost:27017/express-mongo-task-manager';

class Database {

    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(CONNECTION_URL, { useNewUrlParser: true })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;