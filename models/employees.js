let express = require('express');
let connection = require('../config/mysql-connection');
let router = express.Router();
router.get('/', function (req, res) {
    let query = `SELECT * from employees`;

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
    let query = `SELECT * from employees where id = ${id}`;

    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.length == 0) {
            res.send({ 'results': 'id is not found' });
        } else {
            res.send(results);
        }
    });
});

router.put('/:id', function (req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let addr = req.body.addr;
    let salary = req.body.salary;
    let age = req.body.age;
    let query = `UPDATE employees SET
                    name = "${name}",
                    addr = "${addr}",
                    salary = "${salary}",
                    age = "${age}"
            WHERE id = ${id}
            `;
    console.log(query);

    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.affectedRows == 0) {
            res.send({ 'results': 'Updated unsuccessfully' });
        } else {
            res.send({ 'results': 'Updated successfully' });
        }
    });
});

router.post('/', function (req, res) {

    let name = req.body.name;
    let addr = req.body.addr;
    let salary = req.body.salary;
    let age = req.body.age;
    let query = `INSERT INTO employees SET
                    name = "${name}",
                    addr = "${addr}",
                    salary = "${salary}",
                    age = "${age}"
            `;
    console.log(query);

    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.affectedRows == 0) {
            res.send({ 'results': 'Inserted unsuccessfully' });
        } else {
            res.send({ 'results': 'Inserted successfully' });
        }
    });
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    connection.query(`delete from employees where id = ${id}`, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.affectedRows == 0) {
            res.send({ 'result': 'Deleted unsuccessfully' });
        } else {
            res.send({ 'result': 'Deleted successfully' });
        }
    });
});

module.exports = router;
