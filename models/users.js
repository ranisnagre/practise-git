let express = require('express');
let connection = require('../config/mysql-connection');
let router = express.Router();

router.get('/', function (req, res) {
    let query = `SELECT * from users`;
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
    let query = `SELECT * from users WHERE id = ${id}`;

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

router.put('/:id', function (req, res) {
    let id = req.params.id;
    let Fullname = req.body.Fullname;
    let Username = req.body.Username;
    let Password = req.body.Password;
    let Status = req.body.Status;
    let query = `UPDATE users SET
                    Fullname = "${Fullname}",
                    Username = "${Username}",
                    Password = "${Password}",
                    Status = "${Status}"
            WHERE id = ${id}
            `;

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

    let Fullname = req.body.Fullname;
    let Username = req.body.Username;
    let Password = req.body.Password;
    let Status = req.body.Status;
    let query = `INSERT INTO users SET 
                    Fullname = "${Fullname}",
                    Username = "${Username}",
                    Password = "${Password}",
                    Status = "${Status}"
                `;
    connection.query(query, function (error, results) {
        if (error) {
            throw error;
        }
        if (results.affectedRows == 0) {
            res.send({ 'results': 'Record Not inserted' });
        } else {
            res.send({ 'result': 'Record inserted successfully' });
        }
    });
});


router.delete('/:id', function (req, res) {
    let id = req.params.id;
    connection.query(`delete from users where id = ${id}`, function (error, results) {
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