let express = require('express');
let connection = require('../config/mysql-connection');
let router = express.Router();
router.get('/', function (req, res) {
    let query = `SELECT * from finalResults`;

    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.length == 0) {
            res.send({ 'result': 'id is not found' });
        } else {
            res.send(results);
        }

    });
});
router.get('/:id', function (req, res) {
    let id = req.params.id;
    let query = `SELECT * from finalResults WHERE id ${id}`;

    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.length == 0) {
            res.send({ 'result': 'id is not found' });
        } else {
            res.send(results);
        }

    });
});

module.exports = router;