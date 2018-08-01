let express = require('express');
let connection = require('../config/mysql-connection');
let router = express.Router();

router.get('/', function (req, res) {
    let query = `SELECT * from products`;
    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.length === 0) {
            res.send({ 'result': 'id is not found' });
        } else {
            res.send(results);
        }
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    let query = `SELECT * from products WHERE id = ${id}`;

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

// Routing for update products
router.put('/:id', function (req, res) {
    let id = req.params.id;
    let pname = req.body.pname;
    let used = req.body.used;
    let valid = req.body.valid;
    let available = req.body.available;
    let query = `UPDATE products SET
                    pname = "${pname}",
                    used = "${used}",
                    valid = "${valid}",
                    available = "${available}"
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

    let pname = req.body.pname;
    let used = req.body.used;
    let valid = req.body.valid;
    let available = req.body.available;

    let query = `INSERT INTO products SET
                        pname = "${pname}",
                        used = "${used}",
                        valid = ${valid},
                        available = "${available}"
                    `;

    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.affectedRows == 0) {
            res.send({ 'results': 'Inseted unsuccessfully' });
        } else {
            res.send({ 'results': 'Inseted successfully' });
        }
    });
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    connection.query(`delete from products where id = ${id}`, function (error, results) {
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