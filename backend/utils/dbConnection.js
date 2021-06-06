const {connect, connection} = require('mongoose');
const path = require('path');
const {config} = require('dotenv');

module.exports = () => {
    config({
        path: path.resolve(__dirname, '../.env'),
    });

    const {DB_URI, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT} = process.env;

    const uri = `mongodb://${DB_URI}:${DB_PORT}/${DB_NAME}`

    connect(uri, {
        user: DB_USER,
        pass: DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(error => console.error(error.message));
}