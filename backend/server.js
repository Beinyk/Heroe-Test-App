const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, './.env'),
});
const dbConnection = require('./utils/dbConnection');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const todoRoutes = require('./routes/todos');

const PORT = process.env.API_PORT || 3000;

const app = express();

app.use(cors());
// app.use(express.json())
app.use(todoRoutes);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const currentPath = path.dirname(__filename);
app.use('/public', express.static(`${currentPath}/public`));

async function start() {
    try {
        // init database
        dbConnection();
        app.listen(PORT, () => {
            console.log('server has been started... Port - ' + PORT)
        })
    } catch (e) {
        console.log(e);
    }
}

start();